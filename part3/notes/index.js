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

  if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }

  // if the error.name isn't what I am testing for, then 
  // let express do its default error handling by calling next(error)
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (req, res) => {
  res.send('<h1>stuff</h1>')
})

app.get('/api/notes', async (req, res) => {
  const allNotes = await Note.find({})
  res.json(allNotes)
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

app.post('/api/notes', async (req, res, next) => {
  const body = req.body
  
    // build the note
    const note = {
      content: body.content,
      important: body.important || false
    }

    // add the note to the db
    try {
      const savedNote = await Note.create(note)
      res.json(savedNote)
      console.log('note has been saved')
    } catch (error) {
      next(error)
    }

})

app.delete('/api/notes/:id', async (req, res, next) => {
  const { id } = req.params

  // find the note by id and delete it
  try {
    const deletedNote = await Note.findByIdAndDelete(id)
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
app.use(errorHandler)

app.listen(process.env.PORT || 3001, () => {
  console.log(`running on port 3001`)
})