import { IUser, UserBody, users } from "#utils/constants.js";
import { Router } from "express";
import { User } from "#mongoose/schemas/user.js";

interface PostBody {
  name: string;
  password: string;
}
interface UserQueryParams {
  filter?: keyof IUser;
  value?: string;
}
export type UserUpdateBody =
  | {
      name: string;
    }
  | {
      age: number;
    };

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const query = req.query as UserQueryParams;
  const { filter, value } = query;

  console.log("\n");
  console.log(req.headers.cookie);
  console.log(req.signedCookies);
  req.sessionStore.get(req.session.id, (err, session) => {
    console.log("session:");
    console.log(session);
  });

  if (!filter && !value) {
    res.status(200).json(users);
    return;
  }

  if (!filter || !value) {
    res.status(400).json({ error: "Missing required query parameters" });
    return;
  }

  let result: IUser[];

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

userRouter.post("/", async (req, res) => {
  const body = req.body as PostBody;
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
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
