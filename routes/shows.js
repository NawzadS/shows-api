const express = require("express");
const router = express.Router();
const { Show } = require("../database/setup");

// GET all
router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.status(200).json(shows);
  } catch (e) { next(e); }
});

// GET one
router.get("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ error: "Show not found" });
    res.status(200).json(show);
  } catch (e) { next(e); }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const { title, genre, rating } = req.body;
    if (!title || !genre) return res.status(400).json({ error: "title and genre are required" });

    const created = await Show.create({ title, genre, rating: rating ?? 0 });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

// PUT
router.put("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ error: "Show not found" });

    const { title, genre, rating } = req.body;
    await show.update({
      title: title ?? show.title,
      genre: genre ?? show.genre,
      rating: rating ?? show.rating
    });

    res.status(200).json(show);
  } catch (e) { next(e); }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ error: "Show not found" });

    await show.destroy();
    res.status(200).json({ message: "Show deleted" });
  } catch (e) { next(e); }
});

module.exports = router;
