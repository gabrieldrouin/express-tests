import { Router } from "express";

interface User {
  id: number;
  name: string;
  age: number;
}
interface UserPutBody {
  name: string;
  age: number;
}
interface PostBody {
  name: string;
}
interface UserQueryParams {
  filter?: keyof User;
  value?: string;
}
export type UserUpdateBody =
  | {
      name: string;
    }
  | {
      age: number;
    };

const users = [
  { id: 1, name: "one", age: 1 },
  { id: 2, name: "two", age: 2 },
  { id: 3, name: "three", age: 3 },
];

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

  let result: User[];

  if (filter === "name") {
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

userRouter.post("/", (req, res) => {
  const body = req.body as PostBody;
  const newUser = { id: users[users.length - 1].id + 1, name: body.name, age: users[users.length - 1].id + 1 };
  users.push(newUser);

  console.log(users);
  res.status(200).json({ status: "ok" });
});

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

  let result: User[];

  if (filter === "name") {
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

userRouter.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const user = users.find((user) => user.id === userId);
  if (user) res.status(200).json(user);
  else res.status(404).json({ error: "user not found" });
});

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
  const body = req.body as UserPutBody;
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