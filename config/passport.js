const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Admin = require("../models/Admin");

module.exports = (passport) => {
  passport.use(
    "local-user",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found` });
          }

          if (!user.password) {
            return done(null, false, {
              msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile",
            });
          }

          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false, { msg: "Invalid email or password" });
          });
        });
      }
    )
  );

  passport.use(
    "local-admin",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        Admin.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found` });
          }

          if (!user.password) {
            return done(null, false, {
              msg: `This account has not been registered.`,
            });
          }

          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false, { msg: "Invalid email or password" });
          });
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },

      //Note that "done" is the callback for the user
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          service: profile.provider,
          serviceId: profile.id,
          email: profile.emails[0].value,
        };

        console.log(profile.email);

        try {
          let user = await User.findOne({ serviceId: profile.id });

          if (user) {
            return done(null, user, { msg: `User already exists` });
          } else {
            user = await User.create(newUser);
            return done(null, user, { msg: `Creating new user` });
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
