// const express = require("express");
// const router = express.Router();
// const authController = require("./controllers/authController");
// const passport = require("passport");
// const { getBooked } = require("./controllers/flight");

// // Facebook login route
// router.get("/facebook", passport.authenticate("facebook"), (req, res) => {
//   res.redirect("/");
// });

// // Facebook callback route
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: "/login",
//     successRedirect: "/",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// router.get("/", (req, res) => {
//   res.send("hey");
// });

// router.post("/booked", (req, res) => {
//   console.log(req);
// });
// router.get("/booked", (req, res) => {
//   res.send("hey");
// });
// module.exports = router;
