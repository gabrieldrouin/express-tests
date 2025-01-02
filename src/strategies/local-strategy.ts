import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "#utils/constants.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      name: string;
      id: number;
      age: number;
      password: string;
    }
  }
}

passport.serializeUser((user, done) => {
  console.log("serializing");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    console.log("\n");
    console.log("deserializing");
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, false);
  }
});

export default passport.use(
  new Strategy((name, password, done) => {
    try {
      console.log(name);
      console.log(password);
      const findUser = users.find((user) => user.name === name);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Bad credentials");
      done(null, findUser);
    } catch (err) {
      done(err, false);
    }
  }),
);
