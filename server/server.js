const express = require("express");
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const cors = require("cors");
const BP = require("body-parser")
const app = express();




const authRoutes = require("./controllers/authController");
const User = require("./model/UserModel");
app.use(express.json());
app.use(BP.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
mongoose
  .connect("mongodb://localhost:27017/fightApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGOOSE CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new FacebookStrategy(
    {
      clientID: "870301774261393",
      clientSecret: "8124e2dfccaff32a34d40f1149ad2aa3",
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
      scope: ['email', "public_profile"]

    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return cb(null, existingUser);
      }
      const newUser = new User({
        facebookId: profile.id,
        username: profile.displayName,
        email: profile._json.email,
        isLoggedIn: "Yes"
      });
      await newUser.save();
      return cb(null, newUser);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

app.use("/auth", authRoutes);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});




