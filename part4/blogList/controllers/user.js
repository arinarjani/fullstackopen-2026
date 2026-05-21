const userRouter = require('express').Router()
const User = require('../modules/user')
const bcrypt = require('bcrypt');

// .populate('notes', {content: 1, important: 1})

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
        
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

userRouter.post('/', async (request, response, next) => {
    // grab the data sent by the user
    const { username, password, name } = request.body

    if (password.length < 3) {
        return response.status(400).json({error: 'password needs to be a minimum of 3 characters'})
    }

    // create a hash from the user provided password
    const passwordHash = bcrypt.hashSync(password, 10)

    try {
        // create a user
        const user = await User.create({
            username,
            name,
            passwordHash
        })
        
        // respond with status code and user
        response.status(201).json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter