const express = require("express");
const Class = require("../models/class");
const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
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
      .populate("student");
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
      .populate("instructor") // remember that scary line in the model ? this gets the whole user object to display it in the front end 
      .populate("student");

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