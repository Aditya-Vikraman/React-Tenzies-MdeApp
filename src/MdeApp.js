import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor"; 
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

import "./style/MdeStyles.css"
import 'react-mde/lib/styles/css/react-mde-all.css'

export default function MdeApp() {
  
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])
   // notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []

  // initialising state as function is called lazy initialization. this is done so that it doesn't reach into localStorage on every re-render of MdeApp.
  // every time you type anything in note.body the state changes causing the MdeApp to re-render. Since state of note is being tracked there is no need to reach into localStorage everytime.
  // also as state of note is being tracked it will intialise state but only in the background and will continue with the state being tracked. 
  // meaning is intial state is an empty array [] then state is changed, upon re-render of app the state won't go back to empty array instead it will continue with the state being tracked.
  
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect (() => {
    localStorage.setItem ("notes", JSON.stringify(notes))
  },[notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `# Note Title
      Note Body`
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newNotesList = [];
      oldNotes.forEach (item => {
        if (item.id === currentNoteId) {
          newNotesList.splice(0, 0, {...item, body: text}) 
        } else {
          newNotesList.push(item)
        }
      }) 
      return newNotesList
    })
    // below the original code does not move the recently changed note to the top. hence the new code on top.
    // setNotes(oldNotes =>  oldNotes.map(oldNote => {
    //   return oldNote.id === currentNoteId
    //     ? { ...oldNote, body: text }
    //     : oldNote
    // }))
  }

  function deleteNote (event, noteId) {
    event.stopPropagation()
    setNotes (prevNotes => prevNotes.filter (note => note.id !== noteId))
    // filter method returns a new array of items that pass a test (boolean true or false)
    
    // setNotes (prevNotes => { 
    //   const NewNotes = []
    //   prevNotes.map((note) => {
    //     if (note.id !== noteId) {
    //       NewNotes.push(note)
    //     }
    //   })
    //   return NewNotes
    // })
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            terminateNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
