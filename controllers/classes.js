const express = require("express");
const Class = require("../models/class");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

router.post("/new", verifyToken, async (req, res) => {
  try {
    const newClass = await Class.create({
    ...req.body,
    instructor: req.user._id,
  });;
    res.status(201).json({ class: newClass });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create class" });
  }
});

router.get("/", async (req, res) => {
  try {
    const classes = await Class
      .find({})
      // .populate("instructor")
      // .populate("student")
      console.log(classes)

    res.status(200).json({ classes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get classes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleClass = await Class
      .findById(id)
      .populate("instructor", "username role")
      .populate("student", "username");

    if (!singleClass) {
      res.status(404).json({ err: "Class not found" });
    } else {
      res.status(200).json({ class: singleClass });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get class" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      res.status(404).json({ err: "Class not found" });
    } else {
      res.status(200).json({ class: deletedClass });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete class" });
  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedClass) {
      res.status(404).json({ err: "Class not found" });
    } else {
      res.status(200).json({ class: updatedClass });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to update class" });
  }
});


module.exports = router;