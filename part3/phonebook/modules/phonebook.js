const mongoose = require('mongoose')

// connect to db
;(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
    }
})()

// create schema
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


// export mongoose model
module.exports = mongoose.model('phonebook', phonebookSchema)