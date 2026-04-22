const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
    res.send('<h1>stuff</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.statusMessage = `note with the id of ${req.params.id} does not exist`
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(note => Number(note.id))) 
    : 0

  return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (body.content) {
    // build the note
    const note = {
      id: generateId(),
      content: body.content,
      important: body.important || false
    }
    // notes = notes.concat(newNote)
    notes = notes.concat(note)
    // send back the newly added note
    res.json(notes)
  } else {
    res.status(400).json({ error: 'content missing' })
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`running on port 3001`)
})
