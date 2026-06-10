import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    // prevent the page from refreshing after form submit
    e.preventDefault()

    // add note to DB
    createNote({
      content: newNote,
      important: true
    })

    // clear the form
    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder='write note content here'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm