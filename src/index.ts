// index.ts
import express from "express";
import { middleware } from "#middlewares/middlewares.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.get("/", middleware);

app.get("/data", (req, res) => {
  console.log("Request headers:", req.headers, `\n\n\n`);
  res.status(200).json({ name: "Jason" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
