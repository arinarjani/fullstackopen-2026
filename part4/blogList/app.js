const express = require('express')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogList')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogListRouter)

app.get('/', (req, res) => {
    res.send('<p>hello world</p>')
})

module.exports = app