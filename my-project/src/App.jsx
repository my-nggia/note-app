import { useState } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid'
import Header from "./components/Header";


function App() {
  const [notes, setNotes] = useState([])

  function addNote(text) {
    const newNote = {
      id: nanoid(),
      text: text,
      date: new Date().toLocaleDateString("de-DE")
    }

    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }

  function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes);
  }

  return (
    <div className="max-w-[860px] mr-auto ml-auto px-8">
        <Header />
        <NotesList 
          notes={ notes } 
          handleAddNote={ addNote }
          handleDeleteNote={ deleteNote }
          />
    </div>
  );
}

export default App;
