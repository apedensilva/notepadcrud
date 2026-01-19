const Note = require("../models/noteModel");

exports.getNotes = (req, res) => {
  Note.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getNote = (req, res) => {
  const { id } = req.params;
  Note.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createNote = (req, res) => {
  const { title, description, note_date } = req.body;
  if (!title || !description || !note_date) return res.status(400).json({ error: "All fields are required" });

  Note.create({ title, description, note_date }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Note created", id: results.insertId });
  });
};

exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, description, note_date } = req.body;

  Note.update(id, { title, description, note_date }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Note updated" });
  });
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  Note.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Note deleted" });
  });
};
