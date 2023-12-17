import React from 'react'
import Note from './Note'
import AddNewNote from './AddNewNote'

export default function NotesList({ notes, handleAddNote, handleDeleteNote }) {
  return (
      <div className="grid grid-auto-fit gap-3"> 
            {
                  notes.map((note) => (
                        <Note 
                              id={note.id} 
                              text={note.text} 
                              date={note.date}
                              handleDeleteNote={handleDeleteNote}
                        />
                        
                  ))
            }
            <AddNewNote handleAddNote={handleAddNote}/>
      </div>
  )
}
