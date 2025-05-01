// 1. infer Keyword Examples
type ElementType<T> = T extends (infer U)[] ? U : T;
type PromiseType<T> = T extends Promise<infer U> ? U : T;

// Usage examples
type ArrayElement = ElementType<string[]>; // string
type PromiseResult = PromiseType<Promise<number>>; // number

// 2. Variadic Tuple Types
type Push<T extends unknown[], V> = [...T, V];
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

// Usage
type Tuple1 = [1, 2, 3];
type Tuple2 = Push<Tuple1, 4>; // [1, 2, 3, 4]
type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// 3. Recursive Types
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Usage
const validJson: Json = {
  name: "John",
  age: 30,
  tags: ["dev", "ts"],
  metadata: {
    active: true,
    nested: {
      value: 42,
    },
  },
};

// 4. Template Type Inference
type ExtractId<T> = T extends `id-${infer U}` ? U : never;
type ExtractRoute<T> = T extends `/api/${infer U}` ? U : never;

// Usage
type UserId = ExtractId<"id-123">; // "123"
type ApiRoute = ExtractRoute<"/api/users">; // "users"

// 5. Higher-kinded Types (HKT)
interface Functor<F> {
  map: <A, B>(fa: F, f: (a: A) => B) => F;
}

// Implementation for Array
const arrayFunctor: Functor<Array<unknown>> = {
  map: <A, B>(fa: Array<unknown>, f: (a: A) => B): Array<unknown> => {
    return (fa as A[]).map(f);
  },
};

// Usage
const numbers = [1, 2, 3];
const doubled = arrayFunctor.map(numbers, (x: number) => x * 2); // [2, 4, 6]

// 6. Advanced Utility Types
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Usage
interface AdvancedUser {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyUser = DeepReadonly<AdvancedUser>;
type PartialUser = DeepPartial<AdvancedUser>;

// 7. Conditional Type Distribution
type RemoveNull<T> = T extends null | undefined ? never : T;
type ExtractType<T, U> = T extends U ? T : never;

// Usage
type StringOrNumber = string | number | null;
type ValidTypes = RemoveNull<StringOrNumber>; // string | number
type OnlyStrings = ExtractType<StringOrNumber, string>; // string
