const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Load config file
dotenv.config({ path: "config/config.env" });

// Passport config
require("./config/passport")(passport);

// Connect to database
connectDB();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Route Processing
app.use("/auth", require("./routes/auth"));

app.listen(
  process.env.PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
