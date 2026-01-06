const express = require("express");
const Submission = require("../models/submission");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json( submission );
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create submission" });
  }
});

router.get("/", async (req, res) => {
  try {
    const submissions = await Submission
      .find({})
      //.populate("class")      this is wrong it dosent match the model
      //.populate("instructor") this is wrong it dosent match the model
      .populate("student")
      .populate("assignment");

    res.status(200).json({ submissions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get submissions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission
      .findById(id)
      //.populate("class")    this is wrong it dosent match the model
      //.populate("instructor")     this is wrong it dosent match the model
      .populate("student")
      .populate("assignment");

    if (!submission) {
      res.status(404).json({ err: "Submission not found" });
    } else {
      res.status(200).json({ submission });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get submission" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!submission) {
      res.status(404).json({ err: "Submission not found" });
    } else {
      res.status(200).json({ submission });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to update submission" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByIdAndDelete(id);

    if (!submission) {
      res.status(404).json({ err: "Submission not found" });
    } else {
      res.status(200).json({ submission });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete submission" });
  }
});

module.exports = router;