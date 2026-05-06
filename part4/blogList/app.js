const express = require('express')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogList')
const showData = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(showData)
app.use('/api/blogs', blogListRouter)

app.get('/', (req, res) => {
    res.send('<p>hello world</p>')
})

module.exports = app