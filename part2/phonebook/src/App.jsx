import Person from './components/Person.jsx'
import PersonForm from './components/PersonForm.jsx'
import Search from './components/Search.jsx'
import { useState, useEffect } from 'react'
import { add, getAll, erase, update } from './services/phonebook.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAll().then(response => setPersons(response))
  }, [])

  const handlePhonebookSubmit = (e) => {
    e.preventDefault()

    const foundOrNot = persons.find( ({name}) => name.toLowerCase() === newName.toLowerCase() )

    if (!foundOrNot) {
      add({
        name: newName, number: newNumber
      }).then(addedPerson => setPersons(persons.concat(addedPerson)))
    } else if (confirm(`${newName} is already in the phonebook, would you like to update the phone number?`)) {
      // create a copy of found person with a new phone number
      const updatedNumber = {...foundOrNot, number: newNumber}
      // update db to reflect that changes
      update(updatedNumber).then(response => {
        // update state in App to reflect changes
        setPersons(persons.map(p => p.id === response.id ? response : p))
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
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
    }) : 
    console.log('no one deleted')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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