import Note from "./components/Note.jsx"
import Login from './components/Login.jsx'
import Togglable from "./components/Togglable.jsx"
import NoteForm from "./components/NoteForm.jsx"
import { useState, useEffect, useRef } from "react"
import noteService from './services/notes.js'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";

const { getAll, create, update, setToken } = noteService;
const { login } = loginService

function App() {
  // states
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  // refs
  const noteFormRef = useRef()


  // effects
  useEffect(() => {
    getAll()
         .then(initialNotes => {
            setNotes(initialNotes)
         })
  }, [])

  useEffect(() => {
    // get localStorage data, even if empty
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    // check if localStorage data is there or not
    if (loggedUserJSON) {
      // parse the JSON string stored in localStorage
      const user = JSON.parse(loggedUserJSON)

      // set the user state to the user found in localStorage
      setUser(user)

      // set the token for the api to add notes on the backend
      setToken(user.token)
    }
  }, [])

  // custom functions
  const handleLogin = async (username, password) => {
    try {
      const user = await login({username, password})

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setToken(user.token)
    } catch (error) {
      setErrorMessage('wrong credentials')
      console.log({error: error})
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    // delete local storage
    window.localStorage.clear()

    // delete the user state
    setUser(null)

    // clear the user token
    setToken(null)
  }

  const handleAddNote = (note) => {
    noteFormRef.current.toggleVisibility()
    create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportance = ( id ) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    update(id, changedNote)
         .then(returnedNote => {
          setNotes(notes.map(note => note.id === id ? returnedNote : note))
         })
         .catch(err => {
            setErrorMessage(`the note "${note.content}" was already deleted from the server`)
            console.log({error: err})
            setTimeout(() => setErrorMessage(null), 5000)
            setNotes(notes.filter(note => note.id !== id))
         })
  }

  // show all notes, or show only notes whose important value is true
  const notesToShow = showAll ? notes : notes.filter(notes => notes.important)

  const noteForm = () => (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={handleAddNote} />
      </Togglable>
  )
  
  const loginForm = () => (
    <Togglable buttonLabel="login form">
      <Login data={{ handleLogin }} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      { !user && loginForm() }

      { user && (
        <div>
          <p>{user.name} logged in <button type="button" onClick={handleLogout} >logout</button></p>
          {noteForm()}
        </div>
      ) }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)
        }
      </ul>
    </div>
  )
}

export default App
