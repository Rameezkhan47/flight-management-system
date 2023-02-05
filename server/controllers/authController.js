const express = require("express");
const passport = require("passport");
const User = require("../model/UserModel");

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/login');
  });
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("req user is", req.user);
    res.redirect("http://localhost:3000/flights");
  }
);
router.get("/booked", async (req, res) => {
  const {user} = req.query
  try {
    const response = await User.findOne({facebookId: user})
    const{flights} = response
    res.json({message:"success", user:flights})
  } catch (error) {
    console.log(error)
    return res.json({message: "error fetching user"})
  }
});

router.delete("/booked", async (req, res) => {
  try{
    const{facebookId, flightId} = req.body
    await User.updateOne(
      { facebookId},
      { $pull: { flights: { flightId: flightId } } },
      { safe: true, multi: true }
    );
    const user = await User.findOne({facebookId})
    const{flights} = user

    res.json({ message: "success", data: flights});
  }
catch(err){
  console.log(err)
  res.json({ message: "No reservations found"});

}

});


router.post("/booked", async (req, res) => {
  const {arrival, departure, time, facebookId, flightId} = req.body;
  const user = await User.findOne({facebookId});
  console.log("user is", user)
  const {flights} = user
  const flight = {
    flightId,
    arrival,
    departure,
    time,
    
  }
   await User.findOneAndUpdate(
    { facebookId },
    { flights: [...flights, flight ]}
  );
});

module.exports = router;
