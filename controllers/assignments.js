const express = require("express");
const Assignment = require("../models/assignment");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

router.post("/new", verifyToken, async (req, res) => {
  try {
    req.body.instructor = req.user
    console.log(req.user)
    console.log(req.body)
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json({ assignment: newAssignment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create assignment" });
  }
});

router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment
      .find({})
      .populate("class")
      .populate("instructor")

    res.status(200).json({ assignments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get assignments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleAssignment = await Assignment
      .findById(id)
      .populate("class") 
      .populate("instructor");

    if (!singleAssignment) {
      res.status(404).json({ err: "Assignment not found" });
    } else {
      res.status(200).json({ assignment: singleAssignment });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get Assignment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      res.status(404).json({ err: "Assignment not found" });
    } else {
      res.status(200).json({ assignment: deletedAssignment });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete Assignment" });
  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedAssignment) {
      res.status(404).json({ err: "Assignment not found" });
    } else {
      res.status(200).json({ assignment: updatedAssignment });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to update Assignment" });
  }
});

// to make assignment for specific class
// check tmr 
      // const assignments = await Assignment.find({ class: id })
      // res.status(200).json({ assignments });


module.exports = router;