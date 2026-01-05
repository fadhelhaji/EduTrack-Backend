const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('username');
    res.status(200).json({ students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Failed to get students' });
  }
});

module.exports = router;
