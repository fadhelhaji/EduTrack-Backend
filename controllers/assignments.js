const express = require("express");
const Assignment = require("../models/assignment");
const Submission = require('../models/submission');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require("../models/user");
const Class = require("../models/class");




router.get('/my-assignments',verifyToken,async(req,res)=>{
  console.log('in my assignments')
  const allClasses = await Class.find()
  const myClass = allClasses.find((oneClass)=> oneClass.student.includes(req.user._id))
  const assignments = await Assignment.find({class: myClass._id})
  


  const myAssignments = await Assignment.find({class: req.user})
  res.json({assignments})
})

router.post("/new", verifyToken, async (req, res) => {
  try {
    req.body.instructor = req.user
    console.log(req.user)
    console.log(req.body)
    let deadline = new Date(req.body.deadline);

    // Set the last submission time to 1 minute before midnight
    deadline.setHours(23, 59, 0, 0); 

    const assignment = await Assignment.create({
      ...req.body,
      deadline, // save the adjusted deadline
    });
    // const newAssignment = await Assignment.create(req.body);
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
      .populate("instructor")

    res.status(200).json({ assignments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get assignments" });
  }
});

router.get("/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const singleAssignment = await Assignment
      .findById(id)
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

router.get('/:id/submissions', async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await Submission.find({ assignment: id }).populate("student")
    res.status(200).json(submissions)
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to fetch submissions for this assignment" });
  }
})

module.exports = router;