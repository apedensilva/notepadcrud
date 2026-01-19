import axios from "axios";

const BASE_URL = "http://localhost:3001/notes";

export const getNotes = async () => {
  return (await axios.get(BASE_URL)).data;
};

export const addNote = async (note) => {
  return await axios.post(BASE_URL, note);
};

export const updateNote = async (id, note) => {
  return await axios.put(`${BASE_URL}/${id}`, note);
};

export const deleteNoteById = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};
