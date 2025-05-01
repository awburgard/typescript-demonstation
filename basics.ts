// Primitive Types
const realWorkRocks: string = "the real work team is the best!";
const weAreTheBest: string = "we are the best!";

const one: number = 1;
const two: number = 2;

const iAmTrue: boolean = true;
const iAmFalse: boolean = false;

const thisIsNull: null = null;
const thisIsUndefined: undefined = undefined;
const iAmABigInt: bigint = 12345678901234567890n;
const iAmASymbol: symbol = Symbol("iAmASymbol");

const myArray: string[] = ["hello", "world"];
const myTuple: [string, number] = ["hello", 1];

const myObject: { name: string; age: number } = { name: "John", age: 30 };

// Annotations
const myFunction = (name: string, age: number): string => {
  return `Hello, my name is ${name} and I am ${age} years old.`;
};

// Types and Interfaces
interface User {
  name: string;
  age: number;
}

type UserType = {
  name: string;
  age: number;
};

const user: User = { name: "John", age: 30 };
const user2: UserType = { name: "John", age: 30 };

// Type Inference
const inferredUser = { name: "John", age: 30 };

enum StatusEnum {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

type StatusType = "pending" | "approved" | "rejected";

const status1: StatusType = "pending";

const status2: StatusEnum = StatusEnum.Pending;

// Basic Generic
type Box<T> = {
  value: T;
};

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 1 };
