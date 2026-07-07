const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response, next) => {
  // clear the test database from all notes and users
  await Note.deleteMany({})
  // console.log('all notes: \n', await Note.find({}))
  await User.deleteMany({})
  // console.log('all users: \n', await User.find({}))
})

module.exports = router