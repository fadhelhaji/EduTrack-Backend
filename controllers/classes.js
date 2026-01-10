const express = require("express");
const Class = require("../models/class");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const Assignment = require('../models/assignment')
const User = require('../models/user')

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

// pass token for instructor id(filter for only classes created by instructor)
router.get("/", verifyToken, async (req, res) => {
  try {
    const classes = await Class
      .find({ instructor: req.user._id }) // to get classes by only the user
    console.log("Classes found for instructor:", classes);

    res.status(200).json({ classes });
  } catch (err) {
    console.log("Error in GET /class:", err);
    res.status(500).json({ err: "Failed to get classes" });
  }
});

// token needed here as well 
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.find({ class: id });
    const availableStudents = await User.find({ role: 'Student', class: null }, "username _id");
    const classStudents = await User.find({ role: 'Student', class: id }, "username _id");
    const singleClass = await Class.findById(id)
      .populate("instructor", "username role");

    console.log("Class found:", singleClass);
    console.log("Class Students:", classStudents);
    console.log("Available Students:", availableStudents);

    if (!singleClass) {
      return res.status(404).json({ err: "Class not found" });
    }

    res.status(200).json({
      class: singleClass,
      assignment,
      availableStudents,
      classStudents
    });
  } catch (err) {
    console.log("Get class error:", err);
    res.status(500).json({ err: "Failed to get class" });
  }
});


router.post('/:id/assignment/new', verifyToken, async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      class: req.params.id, // to get assignment by class id 
      instructor: req.user._id // to show in all assignment
    });
    res.status(201).json({ assignment: assignment })
  } catch (error) {
    res.status(500).json({ error: "Could not create" })
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
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

router.put("/:id/edit", verifyToken, async (req, res) => {
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

router.put('/:id/add-student/:studentId', verifyToken, async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const cls = await Class.findById(id);
    if (!cls) return res.status(404).json({ error: 'Class not found' });
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    if (!student.firstName || !student.lastName) {
      return res.status(400).json({ error: 'Student must have firstName and lastName' });
    }
    if (!student.class || student.class.toString() !== cls._id.toString()) {
      student.class = cls._id;
      await student.save();
    }
    if (!cls.student) cls.student = [];
    if (!cls.student.some(sId => sId.toString() === student._id.toString())) {
      cls.student.push(student._id);
      await cls.save();
    }
    res.status(200).json({ message: 'Student added successfully', class: cls, student });
  } catch (error) {
    console.error('Add student error:', error);
    res.status(500).json({ error: 'Could not add student' });
  }
});

router.put('/:id/remove-student/:studentId', verifyToken, async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const cls = await Class.findById(id);
    if (!cls) return res.status(404).json({ error: 'Class not found' });
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    student.class = null;
    await student.save();
    cls.student = cls.student.filter(sId => sId.toString() !== student._id.toString());
    await cls.save();
    res.status(200).json({ message: 'Student removed successfully', class: cls, student });
  } catch (error) {
    console.error('Remove student error:', error);
    res.status(500).json({ error: 'Could not remove student' });
  }
});

router.get("/:classId/assignment/:assignmentId", verifyToken, async (req, res) => {
  try {
    const { classId, assignmentId } = req.params;

    const assignment = await Assignment.findOne({
      _id: assignmentId,
      class: classId
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ assignment });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
});




module.exports = router;