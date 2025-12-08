require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/shows", require("./routes/shows"));

app.get("/", (req, res) => res.send("Shows API Running"));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Shows API running on ${PORT}`));
}

module.exports = app;
