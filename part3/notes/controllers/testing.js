const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response, next) => {
  // clear the test database from all notes and users
  await Note.deleteMany({})
  await User.deleteMany({})
})

module.exports = router