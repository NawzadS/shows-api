require("dotenv").config();

const express = require("express");
const { sequelize, Show, Season, Episode } = require("./database/models");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   Middleware
========================= */
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/* =========================
   Routes
========================= */

// GET all shows
app.get("/api/shows", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET show by id
app.get("/api/shows/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }
    res.status(200).json(show);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET seasons for a show
app.get("/api/shows/:id/seasons", async (req, res) => {
  try {
    const seasons = await Season.findAll({
      where: { showId: req.params.id }
    });
    res.status(200).json(seasons);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET episodes for a season
app.get("/api/seasons/:id/episodes", async (req, res) => {
  try {
    const episodes = await Episode.findAll({
      where: { seasonId: req.params.id }
    });
    res.status(200).json(episodes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   Start Server
========================= */
sequelize
  .sync({ force: true })
  .then(async () => {
    // Seed data for production
    await Show.create({
      title: "Sample Show",
      genre: "Drama",
      rating: 9
    });

    app.listen(PORT, () => {
      console.log(`✅ Shows API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
