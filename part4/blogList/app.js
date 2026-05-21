const express = require('express')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogList')
const loginRouter = require('./controllers/login.js')
const userRouter = require('./controllers/user.js')
const { showData, errorHandler, tokenExtractor, UserExtractor } = require('./utils/middleware')
const { MONGODB_URI } = require('./utils/config.js')

const app = express()

mongoose.set('strictQuery', false)

console.log('connecting to', MONGODB_URI)
async function main() {
    await mongoose.connect(MONGODB_URI)
    console.log('connection opened')
}
main().catch(err => console.log('error happened during connection:', err))

app.use(express.json())
app.use(showData)
app.use(errorHandler)
app.use(tokenExtractor)
app.use('/api/blogs', UserExtractor, blogListRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('<p>hello world</p>')
})

module.exports = app