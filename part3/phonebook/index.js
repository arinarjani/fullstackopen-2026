require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Phonebook = require('./modules/phonebook')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :http-version - :response-time ms :body'))

const port = 3001

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

app.get('/', (req, res) => {
    res.send('I am hereeee')
})

app.get('/api/persons', async (req, res) => {
    const allPersons = await Phonebook.find({})

    res.json(allPersons)
})

app.get('/info', async (req,res, next) => {

    try {
        const allContacts = await Phonebook.find({})

        res.send(`Phonebook has info for ${allContacts.length} people. ${Date()}`)
    } catch (error) {
        next(error)
    }
})

app.get('/api/persons/:id', async (req, res, next) => {

    try {
        const foundPerson = await Phonebook.findById(req.params.id)
        res.json(foundPerson)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/persons/:id', async (req, res, next) => {

    // get the id from req.params
    const { id } = req.params

    // delete person and if error, handle it
    try {
        const deletedPerson = await Phonebook.findByIdAndDelete(id)

        console.log('deletedPerson -', deletedPerson)

        res.status(200).json(deletedPerson)
    } catch (error) {
        next(error)
    }
})

app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body

    try {
        const addedContact = await Phonebook.create({
            name, number
        })
        res.json(addedContact)
    } catch (error) {
        next(error)
    }

    // // check if name and number are submitted
    // if (name && number) {
    //     // create phonebook entry
    //     const newContact = await Phonebook.create({
    //         name,
    //         number
    //     })

    //     res.status(201).json(newContact)
    // } else {
    //     // if all checks fail, set status to 400, and send back an error message
    //     res.status(400).json({error: 'name and number must be included'})
    // }

})

app.put('/api/persons/:id', async (req, res, next) => {
    // get the id and body contents
    const { id } = req.params
    const { name, number } = req.body

    // findbyId the person in the phonebook to update
    try {
        const foundPerson = await Phonebook.findById(id)

        // update the foundPerson then save changes to db
        foundPerson.name = name
        foundPerson.number = number

        const updatedPerson = await foundPerson.save()

        res.json(updatedPerson).status(201)
    } catch (error) {
        next(error)
    }
})

// error middleware
app.use((error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformed id' })
    }

    if (error.name === 'ValidationError') {
        return res.status(400).send({ name: error.name, message: error.message })
    }

    next(error)
})
// unknown enpoint middleware
app.use((req,res) => {
    res.json({
        error: 'unknown endpoint'
    })
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})