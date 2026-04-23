const express = require("express");
const router = express.Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/authMiddleware");

// CREATE
router.post("/", auth, async (req, res) => {
  const g = await Grievance.create({
    ...req.body,
    userId: req.user,
  });
  res.json(g);
});

// GET ALL
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find({ userId: req.user });
  res.json(data);
});

// GET BY ID
router.get("/:id", auth, async (req, res) => {
  const g = await Grievance.findById(req.params.id);
  res.json(g);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const g = await Grievance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(g);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// SEARCH
router.get("/search/title", auth, async (req, res) => {
  const data = await Grievance.find({
    title: { $regex: req.query.title, $options: "i" },
  });
  res.json(data);
});

module.exports = router;