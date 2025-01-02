// index.ts
import express, { RequestHandler } from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";
import routes from "#routes/index.js";

declare module "express-session" {
  interface SessionData {
    visited: boolean;
  }
}

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
      maxAge: 20000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth/login", passport.authenticate("local") as RequestHandler, (req, res) => {
  res.sendStatus(200);
});

app.post("/api/auth/logout", passport.authenticate("local") as RequestHandler, (req, res) => {
  req.logout((err) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
  });
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  console.log(req.sessionID);
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  res.send(req.user);
});

app.get("/", (req, res) => {
  console.log("\n");
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  //res.cookie("name", "val", { maxAge: 5000, signed: true });
  //res.cookie("name2", "val2", { maxAge: 5000, signed: true });
  res.send({ msg: "set a cookie." });
  console.log(req.headers.cookie);
  console.log(req.signedCookies);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
