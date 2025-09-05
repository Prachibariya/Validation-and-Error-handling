const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create product
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      res.json({
        message: "Product created",
        data: { name: req.body.name, price: req.body.price }
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
