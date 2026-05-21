const mongoose = require('mongoose')

// create a schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'username must be unique'],
      minLength: [3, 'username must be 3 characters or longer']
    }, 
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

// create a model
const User = mongoose.model('User', userSchema)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// export the model
module.exports = User