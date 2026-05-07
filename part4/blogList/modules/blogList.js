const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config.js')

mongoose.set('strictQuery', false)

console.log('connecting to', MONGODB_URI)
async function main() {
    await mongoose.connect(MONGODB_URI)
    console.log('connection opened')
}
main().catch(err => console.log('error happened during connection:', err))

const blogSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    author: String,
    url: {
        required: true,
        type: String,
        // test for email
        // validate: function(v) {
        //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
        // },
    },
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
