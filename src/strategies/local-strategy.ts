import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "#utils/constants.js";

passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = users.find((user) => user.name === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Bad credentials");
      done(null, findUser);
    } catch (err) {
      done(err, false);
    }
  }),
);
