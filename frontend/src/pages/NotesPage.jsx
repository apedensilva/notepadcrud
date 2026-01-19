import React, { useState, useEffect } from "react";
import { getNotes, addNote, updateNote, deleteNoteById } from "../api/notes";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Toast from "../components/Toast";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteDate, setNoteDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setNoteDate("");
    setEditId(null);
  };

  const submitNote = async () => {
    if (!title || !description || !noteDate) {
      showToast("All fields are required", "error");
      return;
    }

    if (editId) {
      await updateNote(editId, { title, description, note_date: noteDate });
      showToast("Note updated successfully ✏️");
    } else {
      await addNote({ title, description, note_date: noteDate });
      showToast("Note added successfully ✅");
    }

    resetForm();
    fetchNotes();
  };

  const editNote = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setNoteDate(note.note_date);
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    await deleteNoteById(id);
    showToast("Note deleted successfully 🗑");
    fetchNotes();
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} />

      <div className="container">
        <h2>My Notes</h2>
        <NoteForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          noteDate={noteDate}
          setNoteDate={setNoteDate}
          editId={editId}
          onSubmit={submitNote}
          onCancel={resetForm}
        />

        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onEdit={editNote} onDelete={deleteNote} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotesPage;
