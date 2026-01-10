const express = require("express");
const Submission = require("../models/submission");
const router = express.Router();
const User = require("../models/user");
const Assignment = require("../models/assignment");
const sendEmail = require("../utilities/sendEmail");
const verifyToken = require("../middleware/verifyToken");
const verifyToken = require('../middleware/verifyToken');

router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({ err: "Only students can submit assignments" });
    }
    req.body.student = req.user._id;
    const assignment = await Assignment.findById(req.body.assignment).populate("class");
    if (!assignment) return res.status(404).json({ err: "Assignment not found" });
    req.body.class = assignment.class?._id;
    const submission = await Submission.create(req.body);
    const student = await User.findById(req.body.student);

    if (student?.email) {
      await sendEmail({
        to: student.email,
        subject: "Assignment Submitted Successfully",
        html: `
          <h2>Submission Confirmed</h2>
          <p>You have successfully submitted:</p>
          <p><strong>Assignment:</strong> ${assignment.title}</p>
          <p><strong>Deadline:</strong> ${new Date(assignment.deadline).toLocaleDateString()}</p>
          <hr />
          <p><strong>GitHub:</strong> ${req.body.githubUrl}</p>
          <p><strong>Notes:</strong> ${req.body.notes || "None"}</p>
          <br />
          <p>Good luck!</p>
        `,
      });
    }
    res.status(201).json(submission);
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
      .populate("assignment")
      .populate("class", "className");

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
      .populate("assignment")
      .populate("class", "className");


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


router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // adding feedback and grades available only for instructor
    if (req.user.role !== 'Instructor') {
        delete updateData.grade;
        delete updateData.feedback;
        delete updateData.status;} else {
        if (updateData.grade !== undefined && updateData.grade !== null) {
            updateData.status = 'Graded';
        }
    }
    const submission = await Submission.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("student", "firstName lastName")
    .populate("assignment", "title");

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

// do instructor can see the submission for one assignment
router.get("/assignment/:assignmentId", verifyToken, async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignment: assignmentId })
      .populate("student", "firstName lastName username") // Get student names
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to fetch submissions for this assignment" });
  }
});

module.exports = router;