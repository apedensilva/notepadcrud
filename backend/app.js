const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

module.exports = app;
