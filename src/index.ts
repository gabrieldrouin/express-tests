// index.ts
import express from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { middleware } from "#middlewares/middlewares.js";

const app = express();
const port = process.env.PORT ?? "9001";

interface User {
  id: number;
  name: string;
  age: number;
}

interface UserQueryParams {
  filter?: keyof User;
  value?: string;
}

const users = [
  { id: 1, name: "one", age: 1 },
  { id: 2, name: "two", age: 2 },
  { id: 3, name: "three", age: 3 },
];

app.use(helmet());
app.use(morgan("tiny"));

app.get("/", middleware);

app.get("/api/users/", (req, res) => {
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

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const user = users.find((user) => user.id === userId);
  if (user) res.status(200).json(user);
  else res.status(404).json({ error: "user not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
