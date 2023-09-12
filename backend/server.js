const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const User = "/backend/login/login.js";
const jwt = require("jsonwebtoken");
const { Firestore } = require("@google-cloud/firestore");
// const firebase = require("firebase");
// const session = require('express-session')

// requiring the login
const ChatLogin = require("./login/login");
const { verify } = require("crypto");
// google firebase 
// firebase.initializeApp();
// const database = firebase.database();
// 
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());
app.use(cors());

// using express session to make a new browser session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// jwt initialize session
// initailzing passport
app.use(passport.initialize());
// sterializing known users and desterializing with passport

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// obtaining users email to put into db
app.get("");

// register and login
app.post("/register", async (req, res) => {
  // need to salt passwords as well
  try {
    const Salt = process.env.SALT;
    const userEmail = req.body.email;
    var userPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    var userPassword = hashedPassword;
    var userInfo = new ChatLogin({
      email: userEmail,
      password: hashedPassword,
    });
    newUser = await userInfo.save();
    res.redirect("http://localhost:3000/login");
    return console.log("User has been saved" + newUser);
  } catch {
    res.redirect("/register");
    return console.log("New user has not been saved");
  }
});
app.get("/register", async (req, res) => {
  res.redirect("http://localhost:3000/register");
});

// jwt

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Need a token");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log the token and see why its returning invalid
        // res.json({ auth: false, message: "Authentication failed" });
        // console.log({ auth: false, message: "Authentication failed" });
        console.log(token);
        console.log(err);
      } else {
        req.userId = decoded.id;
        return console.log("worked");
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.send("Yes, you have been authenticated.");
});

app.post("/login", async (req, res) => {
  try {
    const userEmail = await req.body.email;
    const findUser = await ChatLogin.findOne({ email: userEmail });
    const userId = await findUser._id;
    if (findUser) {
      const userPassword = await req.body.password;
      const isPassword = await bcrypt.compare(userPassword, findUser.password);
      // console.log("User ID in login post req: " + userId)
      // console.log("JWT secret in login post: " + process.env.JWT_SECRET)
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: 300,
        // 5 min
      });
      if (isPassword) {
        req.login(findUser, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(findUser);
            console.log(userId);

            res.json({
              auth: true,
              token: token,
              result: "ID: " + userId + " Email: " + userEmail,
            });
            console.log("authenticated");
            return console.log("user is now logged in ");
            // return res.redirect("http://localhost:3000/");
          }
        });
      }
    } else {
      return console.log("Wrong email or password");
    }
  } catch (err) {
    return console.log(err);
  }
});
app.get("/login", async (req, res) => {
  res.redirect("http://localhost:3000/login");
});

// firebase cloud
const firestore = new Firestore();

// async function quickstart() {
//   // Obtain a document reference.
//   const document = firestore.doc("posts/intro-to-firestore");
// }

// firebase post request to firecloud for user and user message 
// needs to take the mssage and search for the user itself
app.post("/userInput", async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
})

// connecting to mongoose db
mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

// listening at port 5000
app.listen(5000, (req, res) => {
  console.log("Port 5000 listening");
});
