const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ errors: [{ msg: "Email already exists", param: "email" }] });

      const hashed = await bcrypt.hash(password, 10);
      await new User({ name, email, password: hashed }).save();

      res.json({ message: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });

      res.json({ message: "Login successful" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
