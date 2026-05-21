const notesRouter = require('express').Router()
const Note = require('../models/note.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// notesRouter.get('/', (req, res) => {
//   res.send('<h1>stuff</h1>')
// })

notesRouter.get('/', async (req, res) => {
  const allNotes = await Note.find({}).populate('user', {username: 1, name: 1})
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

// get the token from the header in the request
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  // decode the token returned from getTokenFrom function with jwt
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  // if the token doesn't return an object with a key of 'id', then return 401
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // find the user who belongs to the creator of the note
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  
  // build the note and include the user who created it
  const note = {
    content: body.content,
    important: body.important || false,
    user: user._id
  }

  // add the note to the db
  try {
    // save the note to the db
    const savedNote = await Note.create(note)

    // add the note to the user and save
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

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