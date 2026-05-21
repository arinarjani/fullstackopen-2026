require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    // grab the password and username from request.body
    const { username, password } = request.body

    // find the User with the username provided
    const user = await User.findOne({username}).exec()

    // compare passwordHash from found user in db and the one provided here
    const correctPassword = user !== null ? await bcrypt.compare(password, user.passwordHash) : false

    // if user not found and password is null, send error of wrong username or password
    if (!(user && correctPassword)) {
        return response.status(401).json({error: 'incorrect username or password'})
    }

    // create a userForToken with username and id from user
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // create token with jwt
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    // respond with 200 and the {token, username, name}
    response.status(200).json({
        token, 
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter