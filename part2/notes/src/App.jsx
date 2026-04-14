import Note from "./components/Note.jsx"

import { useState } from "react"

function App( props ) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleAddNote = (e) => {
    e.preventDefault();
    const createdNote = {
      id: String(notes.length + 1),
      content: newNote,
      important: Math.round(Math.random()) === 1 ? true : false
    }

    setNotes(notes.concat(createdNote))
    setNewNotes('')
  }

  const handeNoteChange = (e) => {
    setNewNotes(e.target.value)
  }

  // show all notes, or show only notes whose important value is true
  const notesToShow = showAll ? notes : notes.filter(notes => notes.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} />)
        }
      </ul>
      <form onSubmit={handleAddNote}>
        <input type="text" name="note" value={newNote} onChange={handeNoteChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App
