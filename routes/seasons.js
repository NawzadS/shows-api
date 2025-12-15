const express = require("express");
const router = express.Router();
const { Season, Show } = require("../database/setup");

// GET all
router.get("/", async (req, res, next) => {
  try {
    const seasons = await Season.findAll();
    res.status(200).json(seasons);
  } catch (e) { next(e); }
});

// GET one
router.get("/:id", async (req, res, next) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) return res.status(404).json({ error: "Season not found" });
    res.status(200).json(season);
  } catch (e) { next(e); }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const { seasonNumber, showId } = req.body;
    if (!seasonNumber || !showId) return res.status(400).json({ error: "seasonNumber and showId are required" });

    const show = await Show.findByPk(showId);
    if (!show) return res.status(404).json({ error: "Show not found for showId" });

    const created = await Season.create({ seasonNumber, showId });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

// PUT
router.put("/:id", async (req, res, next) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) return res.status(404).json({ error: "Season not found" });

    const { seasonNumber } = req.body;
    await season.update({ seasonNumber: seasonNumber ?? season.seasonNumber });

    res.status(200).json(season);
  } catch (e) { next(e); }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) return res.status(404).json({ error: "Season not found" });

    await season.destroy();
    res.status(200).json({ message: "Season deleted" });
  } catch (e) { next(e); }
});

module.exports = router;
