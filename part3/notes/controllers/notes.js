const notesRouter = require('express').Router()
const Note = require('../modules/note.js')

// notesRouter.get('/', (req, res) => {
//   res.send('<h1>stuff</h1>')
// })

notesRouter.get('/', async (req, res) => {
  const allNotes = await Note.find({})
  res.json(allNotes)
})

notesRouter.get('/:id', async (req, res, next) => {
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

notesRouter.post('/', async (req, res, next) => {
  const body = req.body
  
    // build the note
    const note = {
      content: body.content,
      important: body.important || false
    }

    // add the note to the db
    try {
      const savedNote = await Note.create(note)
      res.status(201).json(savedNote)
    } catch (error) {
      next(error)
    }

})

notesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  // find the note by id and delete it
  try {
    const deletedNote = await Note.findByIdAndDelete(id)
    res.status(204).end()
  } catch(err) {
    next(err)
  }

  res.status(204).end()
})

notesRouter.put('/:id', async (req, res, next) => {
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

module.exports = notesRouter