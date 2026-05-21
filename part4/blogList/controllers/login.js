require('dotenv').config()

const loginRouter = require('express').Router()
const User = require('../modules/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
    // grab the information sent from the user
    const { username, password } = request.body

    // find the user with the username provided
    const user = await User.findOne({username}).exec()

    // see if the password matches the password hash in the db
    const correctPassword = user ? bcrypt.compareSync(password, user.passwordHash) : null

    // if no user is found, return error
    if (!(user && correctPassword)) {
        return response.status(401).json({error: 'incorrect username or password'})
    }

    // create a token to send back to the user
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    // respond with 200 and the {token, username, name}
    response.status(200).json({
        token, 
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter