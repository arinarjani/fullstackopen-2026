require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./modules/note.js')

app.use(express.json())
app.use(express.static('dist'))

// middleware functions
const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformed id'})
  }

  // if the error.name isn't what I am testing for, then 
  // let express do its default error handling by calling next(error)
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

app.get('/', (req, res) => {
  res.send('<h1>stuff</h1>')
})

app.get('/api/notes', async (req, res) => {
  const allNotes = await Note.find({})
  res.json(allNotes)
  // res.json(notes)
})

app.get('/api/notes/:id', async (req, res, next) => {
  // const note = notes.find(note => note.id === req.params.id)
  
  const foundNote = await Note.findById(req.params.id).exec().catch(err => {
    next(err)
  })
  
  if (foundNote) {
    res.json(foundNote)
  } else {
    res.statusMessage = `note with the id of ${req.params.id} does not exist`
    res.status(404).end()
  }
})

// const generateId = () => {
//   const maxId = notes.length > 0 
//   ? Math.max(...notes.map(note => Number(note.id))) 
//   : 0
  
//   return String(maxId + 1)
// }

app.post('/api/notes', async (req, res) => {
  const body = req.body
  
  if (body.content) {
    // build the note
    const note = {
      // id: generateId(),
      content: body.content,
      important: body.important || false
    }
    // notes = notes.concat(newNote)
    // notes = notes.concat(note)
    
    // add the note to the db
    const savedNote = await Note.create(note).catch(err => console.log(err))
    
    // send back the newly added note
    res.json(savedNote)
  } else {
    res.status(400).json({ error: 'content missing' })
  }
})

app.delete('/api/notes/:id', async (req, res, next) => {
  const { id } = req.params
  // notes = notes.filter(note => note.id !== id)

  // find the note by id and delete it
  try {
    const deletedNote = await Note.findByIdAndDelete(id)

    // if (deletedNote === null) {
    //   res.status(204).send({error: 'no note with that id found'})
    // }
  } catch(err) {
    next(err)
  }

  res.status(204).end()
})

app.put('/api/notes/:id', async (req, res, next) => {
  // get id
  const id = req.params.id
  // get body
  const {content, important} = req.body

  try {
    const oldNote = await Note.findById(id)
    console.log(oldNote)

    if (!oldNote) {
      return res.status(404).end()
    }

    oldNote.content = content
    oldNote.important = important

    const newNote = await oldNote.save()
    return res.json(newNote)
  } catch(err) {
    next(err)
  }

  res.json(await Note.findById(id))
})


// middleware usage
app.use(unknownEndpoint)
app.use(errorHandler)api/persons

app.listen(process.env.PORT || 3001, () => {
  console.log(`running on port 3001`)
})