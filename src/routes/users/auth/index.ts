import { Router } from "express";
import { users, UserBody } from "#routes/users/index.js";

declare module "express-session" {
  interface SessionData {
    user: UserBody;
  }
}

const authRouter = Router();

authRouter.post("/", (req, res) => {
  const body = req.body as UserBody;
  const { name, password } = body;
  const findUser = users.find((user) => {
    return user.name === name;
  });

  if (!findUser || findUser.password !== password) {
    res.status(401).send("Unauthorized");
    return;
  }

  console.log(req.sessionID);

  req.session.user = findUser;
  res.status(200).send(findUser);
});

authRouter.get("/status", (req, res) => {
  if (req.session.user) res.status(200).send(req.session.user);
  else res.status(401).send("Unauthorized");
});

export default authRouter;
