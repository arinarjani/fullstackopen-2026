const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config.js')

mongoose.set('strictQuery', false)

// const url = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
async function main() {
    await mongoose.connect(MONGODB_URI)
    console.log('connection opened')
}
main().catch(err => console.log('error happened during connection:', err))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)