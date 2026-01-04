const express = require("express");
const User = require("../models/user");
const router = express.Router();



// post 
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create user" });
  }
});
// get 
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get users" });
  }
});

// get by ID

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ err: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get user" });
  }
});

// delete by id 
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ err: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete user" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      res.status(404).json({ err: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to update user" });
  }
});

module.exports = router;