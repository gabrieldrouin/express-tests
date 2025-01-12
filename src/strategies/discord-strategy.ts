import { DiscordUser } from "#mongoose/schemas/discord-user.js";
import passport from "passport";
import { Strategy } from "passport-discord";

passport.serializeUser((user, done) => {
  console.log("serializing");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  console.log("deserializing");
  DiscordUser.findById(id)
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
      callbackURL: process.env.DISCORD_CALLBACK_URL ?? "",
      clientID: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      scope: ["identify"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);

      DiscordUser.findOne({ discordID: profile.id })
        .then((findUser) => {
          if (!findUser) {
            const newUser = new DiscordUser({ discordID: profile.id, username: profile.username });
            newUser
              .save()
              .then((newSavedUser) => {
                done(null, newSavedUser);
              })
              .catch((err: unknown) => {
                console.log(err);
                done(err, false);
              });
          } else {
            done(null, findUser);
          }
        })
        .catch((err: unknown) => {
          console.log(err);
          done(err, false);
        });
    },
  ),
);
