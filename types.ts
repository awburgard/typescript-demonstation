/**
 * Utility type to determine whether a type is a "plain object".
 *
 * A "plain object" means:
 * - Not a function
 * - Not an array
 * - Still extends object (i.e. not string, number, etc.)
 */
type IsPlainObject<T> = T extends object // Is it any kind of object?
  ? T extends (...args: unknown[]) => unknown // Exclude functions
    ? false
    : T extends unknown[] // Exclude arrays
    ? false
    : true // Otherwise it's a plain object
  : false; // Not an object at all (e.g. string, number, null)

/**
 * Recursively generates dot-notation string keys for all deeply nested
 * properties of a given object `T`. Used for autocompletion and access safety.
 *
 * Example:
 * ```ts
 * type Obj = { a: { b: { c: string } }, d: number };
 * NestedKeyOf<Obj> // "a" | "a.b" | "a.b.c" | "d"
 * ```
 *
 * Explanation:
 * - For each key `K` in the object:
 *   - If the value at `K` is a plain object (and not null/undefined),
 *     it recurses into that object and prepends `K.` to all its nested keys.
 *   - Otherwise, it just includes the key `K` directly.
 */
export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: IsPlainObject<
        // Restrict keys to string/number only
        NonNullable<T[K]>
      > extends true // Only recurse into plain objects
        ? `${K}` | `${K}.${NestedKeyOf<NonNullable<T[K]>>}` // Recurse with dot notation
        : `${K}`; // Otherwise, just return the key as-is
    }[keyof T & (string | number)] // Collapse the mapped type into a union
  : never;

/**
 * Given an object `T` and a string `K` in dot-notation format, recursively
 * resolves the type of the value at that path.
 *
 * Example:
 * ```ts
 * type Obj = { a: { b: { c: string } }, d: number };
 * NestedValue<Obj, "a.b.c"> // string
 * NestedValue<Obj, "d">     // number
 * ```
 *
 * Explanation:
 * - If `K` is in the form "a.b.c", split it at the first dot:
 *   - Check if `a` is a key of `T`.
 *   - If so, recursively look up "b.c" in `T["a"]`.
 * - If `K` is a top-level key, just return `T[K]`.
 */
export type NestedValue<T, K extends string> = K extends `${infer F}.${infer R}` // Split the key into first and rest
  ? F extends keyof T // Check if the first key is valid
    ? NestedValue<NonNullable<T[F]>, R> // Recurse into the nested object
    : never // Invalid path
  : K extends keyof T // Base case: single-level key
  ? T[K]
  : never;

/*🧠 Special Note: Why NonNullable is Critical

In the `NestedValue` type, we use `NonNullable<T[F]>` to ensure that we're
always working with a valid object. This is crucial because:

- If `T[F]` is `null` or `undefined`, it would cause a runtime error when
  trying to access its properties.
- By using `NonNullable<T[F]>`, we catch these errors at compile time.

This is especially important for deeply nested properties, where even a single
invalid reference can lead to runtime errors.

interface AccountSettings {
  visibilitySettings?: {
    makeNewJobsPublic: boolean;
  };
}
In raw form, visibilitySettings is of type
{ makeNewJobsPublic: boolean } | undefined
Now, if you recurse into that without NonNullable, TypeScript hits undefined, which:

Fails the IsPlainObject check (or basic object check)

Kills recursion

Ends the key or value resolution early

By using NonNullable<T[K]>:

You explicitly tell TypeScript to ignore undefined | null while traversing types

This enables complete and correct access to all nested keys

And ensures that both NestedKeyOf and NestedValue give full results even for optional properties
*/
