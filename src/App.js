import React, { useState, useEffect } from "react";

function App() {
  // 1. This part LOOKS for saved notes when the app starts
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("my-notes");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [text, setText] = useState("");

  // 2. This part SAVES notes to memory every time you add/delete
  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === "") return;
    setNotes([...notes, text]);
    setText("");
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>My Notes 📝</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />
        <button onClick={addNote} style={{ padding: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note, index) => (
          <li key={index} style={{ background: "#fff9c4", padding: "10px", marginBottom: "5px", display: "flex", justifyContent: "space-between", border: "1px solid #ddd" }}>
            {note}
            <button onClick={() => deleteNote(index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;