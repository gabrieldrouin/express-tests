// index.ts
import express from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { middleware } from "#middlewares/middlewares.js";
import routes from "#routes/index.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(routes);

app.get("/", middleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
