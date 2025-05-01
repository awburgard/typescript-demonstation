interface IntermediateUser {
  id: number;
  name: string;
}

interface Config {
  theme: string;
}

function greet(): string {
  return "Hello";
}

// Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

const isCircle = (
  shape: Shape
): shape is { kind: "circle"; radius: number } => {
  return shape.kind === "circle";
};

const isSquare = (shape: Shape): shape is { kind: "square"; size: number } => {
  return shape.kind === "square";
};

const isRectangle = (
  shape: Shape
): shape is { kind: "rectangle"; width: number; height: number } => {
  return shape.kind === "rectangle";
};

// Discriminated Unions & Exhaustiveness Checking with never

// Exhaustiveness Checking
function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Type Narrowing
function logId(id: string | number) {
  if (typeof id === "string") console.log(id.toUpperCase());
  else console.log(id.toFixed(2));
}

// Using `in` Keyword
function hasId(obj: unknown): obj is { id: number } {
  return typeof obj === "object" && obj !== null && "id" in obj;
}

// Advanced Generics
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// Mapped Types
type ReadonlyType<T> = {
  [P in keyof T]: T[P];
};

// Indexed Access Types
type UserIdType = IntermediateUser["id"];

// Template Literal Types
type Events = `on${Capitalize<string>}`;

// Conditional Types
type IsString<T> = T extends string ? true : false;

// Satisfies Operator
const config = { theme: "dark" } satisfies Config;

// 🔧 Common Utility Types

// Partial<T>
type PartialUserType = Partial<IntermediateUser>;

// Required<T>
type RequiredUserType = Required<IntermediateUser>;

// Readonly<T>
type ReadonlyUserType = Readonly<IntermediateUser>;

// Pick<T, K>
type UserNameOnlyType = Pick<IntermediateUser, "name">;

// Omit<T, K>
type WithoutId = Omit<User, "id">;

// Record<K, T>
type StringToNumberMap = Record<string, number>;

// ReturnType<T>
type GreetReturn = ReturnType<typeof greet>;

// Awaited<T>
type AwaitedReturnType = Awaited<ReturnType<typeof greet>>;

// as const
const directions = ["up", "down"] as const;

// Function Overloads
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(a: number, b?: number, c?: number): Date {
  return b && c ? new Date(a, b - 1, c) : new Date(a);
}
