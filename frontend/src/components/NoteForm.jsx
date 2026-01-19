import React from "react";

const NoteForm = ({ title, setTitle, description, setDescription, noteDate, setNoteDate, editId, onSubmit, onCancel }) => (
  <div className="note-form">
    <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
    <input type="date" value={noteDate} onChange={e => setNoteDate(e.target.value)} />
    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

    <div className="form-actions">
      <button onClick={onSubmit}>{editId ? "Update Note" : "Add Note"}</button>
      {editId && <button className="cancel-btn" onClick={onCancel}>Cancel</button>}
    </div>
  </div>
);

export default NoteForm;
