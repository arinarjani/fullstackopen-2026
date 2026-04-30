import Person from './components/Person.jsx'
import PersonForm from './components/PersonForm.jsx'
import Search from './components/Search.jsx'
import Notification from './components/Notification.jsx'
import { useState, useEffect } from 'react'
import { add, getAll, erase, update } from './services/phonebook.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    getAll().then(response => setPersons(response))
  }, [])

  const handlePhonebookSubmit = (e) => {
    e.preventDefault()

    const found = persons.find( ({name}) => name.toLowerCase() === newName.toLowerCase() )

    if (!found) {
      add({
        name: newName, number: newNumber
      }).then(addedPerson => {
        // if there is an error sent back, move to the catch block
        // I tried do do this in ./services/phonebook, but 
        // if I write, 'return res.status(400).send({ error: error.name })'
        // in ../../part3/phonebook/index.js, I get the json back, and that
        // gets added to the persons state. If I don't have the
        // custom error middleware, then I get an error in axios
        // which can be handled accordingly, but the course wants us to use
        // a custom error middleware, at least it did for the notes app
        if (addedPerson.name === 'ValidationError') {
          throw new Error(addedPerson.message)
        }

        setPersons(persons.concat(addedPerson))
        setNotification(`added ${addedPerson.name}`)
        setTimeout(() => setNotification(null), 3000)
      }).catch(error => {
        console.log(error)

        setNotification(`${error}`)
        setTimeout(() => setNotification(null), 3000)
      })
    } else if (confirm(`${newName} is already in the phonebook, would you like to update the phone number?`)) {
      // create a copy of found person with a new phone number
      const updatedNumber = {...found, number: newNumber}

      // update db to reflect that changes
      update(updatedNumber).then(updatedPerson => {
        
        // see lines 29 - 36
        if (updatedPerson.name === 'ValidationError') {
          throw new Error(updatedPerson.message)
        }

        // update state in App to reflect changes
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
        setNotification(`updated ${updatedPerson.name}`)
        setTimeout(() => setNotification(null), 3000)
      }).catch(error => {
        setNotification(`${error}`)
        setTimeout(() => setNotification(null), 3000)
      })
    } else {
      console.log('nothing was updated')
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const deleteBtn = (id) => {
    confirm(`Are you sure you want to delete "${persons.find(p => p.id === id).name}"`) ? 
    erase(id).then(deletedPerson => {
      console.log('font-end deletedPerson -', deletedPerson)
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
      setNotification(`deleted ${deletedPerson.name}`)
      setTimeout(() => setNotification(null), 3000)
    }).catch(err => {
      console.log('errrrrrrrrrrr: ', err)
      const deletedPerson = persons.find(p => p.id === id)
      setPersons(persons.filter(p => p.id !== deletedPerson.id))
      setNotification(`${deletedPerson.name} has already been deleted`)
      setTimeout(() => setNotification(null), 3000)
    }) : 
    console.log('no one deleted')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Search search={search} handleSearch={handleSearch} />
      <PersonForm 
        name={newName} 
        number={newNumber} 
        nameChange={handleNewNameChange} 
        numberChange={handleNewNumberChange}
        updatePhonebook={handlePhonebookSubmit} 
      />
      <h2>Numbers</h2>
      {
        search !== '' 
          ? 
            persons.filter(({name}) => {
              return name.toLowerCase().includes(search)
            }).map(person => <Person key={person.id} name={person.name} number={person.number} button={() => deleteBtn(person.id)} />) 
          :
            persons.map(person => <Person key={person.id} name={person.name} number={person.number} button={() => deleteBtn(person.id)} />)
      }
    </div>
  )
}

export default App

// {
//   "persons": [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": "1"
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": "2"
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": "3"
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": "4"
//     },
//     {
//       "name": "arin",
//       "number": "1",
//       "id": "pT_WgeLEYX4"
//     }
//   ],
//   "$schema": "./node_modules/json-server/schema.json"
// }