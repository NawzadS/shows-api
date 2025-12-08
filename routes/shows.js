const express = require("express");
const router = express.Router();
const { Show } = require("../database/setup");

router.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
