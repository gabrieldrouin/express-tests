import { createUserHandler, getUserByIdHandler } from "#handlers/users.js";
import { IUser, UserBody, users } from "#utils/constants.js";
import { Router } from "express";

export type UserUpdateBody =
  | {
      age: number;
    }
  | {
      name: string;
    };
interface UserQueryParams {
  filter?: keyof IUser;
  value?: string;
}

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const query = req.query as UserQueryParams;
  const { filter, value } = query;

  if (!filter && !value) {
    res.status(200).json(users);
    return;
  }

  if (!filter || !value) {
    res.status(400).json({ error: "Missing required query parameters" });
    return;
  }

  let result: IUser[];

  if (filter === "name" || filter === "password") {
    result = users.filter((user) => user[filter].includes(value));
  } else {
    const numValue = parseInt(value);
    result = users.filter((user) => user[filter] === numValue);
  }

  if (result.length === 0) {
    res.status(404).json({ error: "No users found matching criteria" });
    return;
  }

  res.status(200).json(result);
  return;
});

userRouter.get("/:id", getUserByIdHandler);

userRouter.post("/", createUserHandler);

userRouter.patch("/:id", (req, res) => {
  const body = req.body as UserUpdateBody;
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    res.sendStatus(400);
    return;
  }

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    res.sendStatus(404);
    return;
  }

  if ("name" in body) {
    users[userIndex].name = body.name;
  } else if ("age" in body) {
    users[userIndex].age = body.age;
  }

  console.log(users);

  res.json(users[userIndex]);
});

userRouter.put("/:id", (req, res) => {
  const body = req.body as UserBody;
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    res.sendStatus(400);
    return;
  }

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    res.sendStatus(404);
    return;
  }

  users[userIndex] = { ...users[userIndex], ...body };

  console.log(users);

  res.json(users[userIndex]);
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    res.sendStatus(400);
    return;
  }

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    res.sendStatus(404);
    return;
  }

  users.splice(userIndex);

  res.json(users);
});

export default userRouter;
