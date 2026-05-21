const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // const user = new User({
  //   username,
  //   name,
  //   passwordHash,
  // })

  // const savedUser = await user.save()
  try {
    const savedUser = await User.create({
      username,
      name,
      passwordHash,
    })
    
    response.status(201).json(savedUser)  
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  // get all users from the DB
  const allUsers = await User.find({}).populate('notes', {content: 1, important: 1})

  // return all uses in the db as JSON
  try {
    response.json(allUsers) 
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter