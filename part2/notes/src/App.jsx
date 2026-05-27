import Note from "./components/Note.jsx"
import Login from './components/Login.jsx'
import { useState, useEffect } from "react"
import noteService from './services/notes.js'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";

const { getAll, create, update, setToken } = noteService;
const { login } = loginService

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({username, password})

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
    // const returnedToken = login(username, password)
    // console.log('user token', returnedToken)
  }

  const handleLogout = () => {
    // delete local storage
    window.localStorage.clear()

    // delete the user state
    setUser(null)

    // clear the user token
    setToken(null)


  }

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
            setErrorMessage(`the note "${note.content}" was already deleted from the server`)
            setTimeout(() => setErrorMessage(null), 5000)
            setNotes(notes.filter(note => note.id !== id))
         })
  }

  // show all notes, or show only notes whose important value is true
  const notesToShow = showAll ? notes : notes.filter(notes => notes.important)

  // const loginForm = () => (
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         <label>
  //           username
  //           <input
  //             type="text"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           password
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <button type="submit">login</button>
  //     </form>
  // )

  const noteForm = () => (
      <form onSubmit={handleAddNote}>
        <input type="text" name="note" value={newNote} onChange={handeNoteChange} />
        <button type="submit">submit</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && <Login data={{handleLogin, username, password, setUsername, setPassword}} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button type="button" onClick={handleLogout} >logout</button>
          {noteForm()}
        </div>
      )}

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)
        }
      </ul>
    </div>
  )
}

export default App
