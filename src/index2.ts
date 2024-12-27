// fetch.ts
import express from "express";
import { middleware } from "#middlewares/middlewares.js";

const app = express();
const port = "4000";

app.get("/", middleware);

app.get("/data", async (req, res) => {
  const value = await getData();
  res.status(200).json(value);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

interface UserResponse {
  name: string;
}

async function getData(): Promise<UserResponse> {
  const res = await fetch("http://localhost:3001/data");
  if (!res.ok) {
    throw new Error(`Status ${res.status.toString()}`);
  }
  const data = (await res.json()) as UserResponse;
  if (typeof data.name !== "string") {
    throw new Error(`Expected UserResponse, got ${typeof data}`);
  }
  return data;
}

await getData();
