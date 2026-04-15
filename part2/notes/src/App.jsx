import Note from "./components/Note.jsx"
import { useState, useEffect } from "react"
import noteService from './services/notes.js'

const { getAll, create, update } = noteService;

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    getAll()
         .then(initialNotes => {
            setNotes(initialNotes)
         })
  }, [])

  const handleAddNote = (e) => {
    e.preventDefault();
    const createdNote = {
      content: newNote,
      important: Math.round(Math.random()) === 1 ? true : false
    }

    create(createdNote)
         .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            setNewNotes('')
         })
  }

  const handeNoteChange = (e) => {
    setNewNotes(e.target.value)
  }

  const toggleImportance = ( id ) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    update(id, changedNote)
         .then(returnedNote => {
          setNotes(notes.map(note => note.id === id ? returnedNote : note))
         })
         .catch(err => {
            alert(`the note "${note.content}" was already deleted from the server`)
            setNotes(notes.filter(note => note.id !== id))
         })
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
          notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)
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
