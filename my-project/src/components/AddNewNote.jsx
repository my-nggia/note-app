import React, { useState } from 'react'

const remote_url = 'http://mygia:mygia123@127.0.0.1:5984/notes_test'

export default function AddNewNote({ handleAddNote }) {

      const [noteText, setNoteText] = useState('')

      const charLimit = 200;

      // const DB = new PouchDB('remote_url');

      function handleChange(e) {
            if (charLimit - e.target.value.length >= 0 ) {
                  setNoteText(e.target.value);
            }
      }

      function handleSave() {
            if (noteText.trim().length > 0) {
                  handleAddNote(noteText);
                  setNoteText('');
            }
            
      }

      return (
      <div 
            className='bg-slate-300 mb-10 p-2 rounded-lg h-[170px] flex flex-col justify-between'>
      <textarea 
            rows={8}
            cols={10}
            className="border-none resize-none bg-slate-300 focus:outline-none text-black"
            placeholder="Type to add new note ..."
            value={noteText}
            onChange={handleChange}
      >
      </textarea>
      <div className='flex flex-row justify-between align-middle'>
            <small className="font-bold">{charLimit - noteText.length}/200</small>
            <button 
                  className="bg-lime-100 text-green-700 font-semibold rounded-lg px-1 hover:bg-lime-50 cursor-pointer"
                  onClick={handleSave}
                  >
                  Save
            </button>
      </div>
      </div>
      )
}
