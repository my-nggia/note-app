import { useState } from "react";
import NotesList from "./components/NotesList";
import Header from "./components/Header";
import PouchDB from 'pouchdb'

const remote_url = 'http://mygia:mygia123@127.0.0.1:5984/notes_test'
const DB = new PouchDB(remote_url);
const syncDB = new PouchDB('http://mygia:mygia123@127.0.0.1:5984/notes_test_sync')

let sync = PouchDB.sync(DB, syncDB, {live: true, retry: true})
  .on('change', info => {
    console.log("There was a change: ", info);
  })
  .on('paused', (err) => {
    console.log("Sync has been paused: ", err);
  })
  .on('active', () => {
    console.log("The replication (Sync) has been resumed");
  })

function App() {
  const [notes, setNotes] = useState([]);
  let allNotes = []

  async function getAllNotes(){
    await DB.allDocs({ include_docs: true }).then((res) => {
    res.rows.map(r => {
      allNotes = [...allNotes, {
        id: r.doc._id,
        text: r.doc.text,
        date: r.doc.date,
      }]
    })
    setNotes(allNotes);
  })
} 


  getAllNotes()

  function addNote(text) {
    const newNote = {
      _id: new Date(),
      text: text,
      date: new Date().toLocaleDateString("de-DE")
    }
    
    try {
      DB.put( newNote ,(err, res)  => {
        if (!err) {console.log("Added New Note Successfully");}
        else console.log(err);
      })
    } catch (error) {
      console.log(`Error ${error}`);
    }

    const newNotes = [...notes, newNote]
    setNotes(newNotes)

  }

  allNotes = []
  function deleteNote(id) {

    DB.get(id).then(function (doc) {
      DB.remove(doc);
    });
    
    getAllNotes();
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
