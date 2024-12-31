// index.ts
import express from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "#routes/index.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser("supersecret"));
app.use(
  session({
    secret: "supersecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 10000,
    },
  }),
);
app.use(routes);

declare module "express-session" {
  interface SessionData {
    visited: boolean;
  }
}

app.get("/", (req, res) => {
  console.log(req.sessionID);
  req.session.visited = true;
  //res.cookie("name", "val", { maxAge: 5000, signed: true });
  //res.cookie("name2", "val2", { maxAge: 5000, signed: true });
  res.send({ msg: "set a cookie." });
  //console.log(req.headers.cookie);
  //console.log(req.cookies);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
