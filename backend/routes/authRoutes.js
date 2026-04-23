const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/test", (req, res) => {
  console.log("TEST HIT");
  res.send("OK");
});

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body); // 👈 add this

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  console.log(user); // 👈 add this

  res.json({ msg: "Registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
    token,
    name: user.name
  });
});

module.exports = router;