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
    name: {
        type: String,
        minLength:3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number! Must be in form 111-111-1111`
        },
        required: [true, 'User phone number required']
    }
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