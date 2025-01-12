export const users: IUser[] = [
  { age: 1, id: 1, name: "one", password: "one" },
  { age: 2, id: 2, name: "two", password: "two" },
  { age: 3, id: 3, name: "three", password: "three" },
];
export interface IUser extends UserBody {
  id: number;
}
export interface UserBody {
  age: number;
  name: string;
  password: string;
}
