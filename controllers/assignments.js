const express = require("express");
const Assignment = require("../models/assignment");
const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json({ assignment: newAssignment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create assignment" });
  }
});





module.exports = router;