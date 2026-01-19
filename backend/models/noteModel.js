const db = require("../database/db");

const Note = {
  getAll: (callback) => {
    db.query("SELECT * FROM notes ORDER BY id DESC", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM notes WHERE id = ?", [id], callback);
  },

  create: (note, callback) => {
    db.query(
      "INSERT INTO notes (title, description, note_date) VALUES (?, ?, ?)",
      [note.title, note.description, note.note_date],
      callback
    );
  },

  update: (id, note, callback) => {
    db.query(
      "UPDATE notes SET title = ?, description = ?, note_date = ? WHERE id = ?",
      [note.title, note.description, note.note_date, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM notes WHERE id = ?", [id], callback);
  }
};

module.exports = Note;
