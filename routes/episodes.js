const express = require("express");
const router = express.Router();
const { Episode, Season } = require("../database/setup");

// GET all
router.get("/", async (req, res, next) => {
  try {
    const episodes = await Episode.findAll();
    res.status(200).json(episodes);
  } catch (e) { next(e); }
});

// GET one
router.get("/:id", async (req, res, next) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: "Episode not found" });
    res.status(200).json(episode);
  } catch (e) { next(e); }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const { title, duration, seasonId } = req.body;
    if (!title || !duration || !seasonId) return res.status(400).json({ error: "title, duration, and seasonId are required" });

    const season = await Season.findByPk(seasonId);
    if (!season) return res.status(404).json({ error: "Season not found for seasonId" });

    const created = await Episode.create({ title, duration, seasonId });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

// PUT
router.put("/:id", async (req, res, next) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: "Episode not found" });

    const { title, duration } = req.body;
    await episode.update({
      title: title ?? episode.title,
      duration: duration ?? episode.duration
    });

    res.status(200).json(episode);
  } catch (e) { next(e); }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: "Episode not found" });

    await episode.destroy();
    res.status(200).json({ message: "Episode deleted" });
  } catch (e) { next(e); }
});

module.exports = router;
