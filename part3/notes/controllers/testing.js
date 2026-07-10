const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  // delete all notes in the db
  await Note.deleteMany({})

  // delete all users in the db
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router