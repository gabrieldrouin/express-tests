import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "#mongoose/schemas/user.js";
import { Types } from "mongoose";
import { comparePassword } from "#utils/helpers.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id?: Types.ObjectId;
      name?: string;
      age?: number;
      password?: string;
    }
  }
}

passport.serializeUser((user, done) => {
  console.log("serializing");
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  console.log("deserializing");
  User.findOne({ _id: id })
    .then((findUser) => {
      if (!findUser) throw new Error("User not found");
      done(null, findUser);
    })
    .catch((err: unknown) => {
      done(err, false);
    });
});

export default passport.use(
  new Strategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    (name, password, done) => {
      console.log(name);
      console.log(password);
      User.findOne({ name })
        .then((findUser) => {
          if (!findUser) throw new Error("User not found");
          if (!comparePassword(password, findUser.password)) throw new Error("Bad credentials");
          done(null, findUser);
        })
        .catch((err: unknown) => {
          done(err, false);
        });
    },
  ),
);
