// index.ts
import express from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { middleware } from "#middlewares/middlewares.js";

const app = express();
const port = process.env.PORT ?? "9001";

const users = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
];

app.use(helmet());
app.use(morgan("tiny"));

app.get("/", middleware);

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
