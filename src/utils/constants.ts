export const users = [
  { id: 1, name: "one", age: 1, password: "one" },
  { id: 2, name: "two", age: 2, password: "two" },
  { id: 3, name: "three", age: 3, password: "three" },
];
export interface UserBody {
  name: string;
  age: number;
  password: string;
}
export interface User extends UserBody {
  id: number;
}
