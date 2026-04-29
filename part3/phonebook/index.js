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

// let phonebook = [
//     { 
//         "id": "1",
//         "name": "Arto Hellas", 
//         "number": "040-123456"
//     },
//     { 
//         "id": "2",
//         "name": "Ada Lovelace", 
//         "number": "39-44-5323523"
//     },
//     { 
//         "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//         "id": "4",
//         "name": "Mary Poppendieck", 
//         "number": "39-23-6423122"
//     }
// ]

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

    // res.json(phonebook)
})

app.get('/info', async (req,res, next) => {
    // res.send(`Phonebook has info for ${phonebook.length} people. ${Date()}`)

    try {
        const allContacts = await Phonebook.find({})

        res.send(`Phonebook has info for ${allContacts.length} people. ${Date()}`)
    } catch (error) {
        next(error)
    }
})

app.get('/api/persons/:id', async (req, res, next) => {
    // const person = phonebook.find(p => p.id === req.params.id)

    // if (person) {
    //     res.json(person)
    // } else {
    //     res.status(404).json({error: 'no person found with that id'})
    // }

    try {
        const foundPerson = await Phonebook.findById(req.params.id)
        res.json(foundPerson)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/persons/:id', async (req, res, next) => {
    // const person = phonebook.find(p => p.id === req.params.id)

    // get the id from req.params
    const {id} = req.params

    // delete person and if error, handle it
    try {
        await Phonebook.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }

    // if (person) {
    //     // delete person found by returning phonebook filtered w/o person
    //     phonebook = phonebook.filter(p => p.id !== req.params.id)
    //     res.status(204).end()
    // } else {
    //     // respond with person already delete or not found
    //     res.status(404).json({error: 'person not found or already deleted. try agin'})
    // }
})

app.post('/api/persons', async (req, res) => {
    const {name, number} = req.body

    // check if name and number are submitted
    if (name && number) {
        // create phonebook entry
        const newContact = await Phonebook.create({
            name,
            number
        })

        res.status(201).json(newContact)

        // // check if name is already in the phonebook
        // const duplicateName = phonebook.find(p => p.name.toLowerCase() === name.toLowerCase()) 
        
        // if (duplicateName) {
        //     // if dupliacte name exists, set status to 400, and send back an error message
        //     res.status(400).json({error: 'name already exists in phonebook. name must be unique'})
        // } else {
        //     const person = {
        //         name,
        //         number,
        //         id: Math.round(Math.random() * 100), 
        //     }
        
        //     phonebook = phonebook.concat(person)
        
        //     res.status(201).json(phonebook)
        // }
    } else {
        // if all checks fail, set status to 400, and send back an error message
        res.status(400).json({error: 'name and number must be included'})
    }

})

app.put('/api/persons/:id', async (req, res, next) => {
    // get the id and body contents
    const {id} = req.params
    const {name, number} = req.body

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
        return res.json({error: 'malformed id'})
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