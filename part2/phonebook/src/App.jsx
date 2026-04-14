import Person from './components/Person.jsx'
import PersonForm from './components/PersonForm.jsx'
import Search from './components/Search.jsx'
import { useState } from 'react'

// import {
//   handlePhonebookSubmit,
//   handleNewNameChange,
//   handleNewNumberChange,
//   handleSearch
// } from './helpers/handlers.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handlePhonebookSubmit = (e) => {
    e.preventDefault()

    const foundOrNot = persons.find( ({name}) => name.toLowerCase() === newName.toLowerCase() )

    !foundOrNot ? 
      setPersons(persons.concat({name: newName, number: newNumber, id:persons.length + 1})) :
      alert(`${newName} is already in the phonebook. Try again.`)

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
            }).map(person => <Person key={person.id} name={person.name} number={person.number} />) 
          :
            persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)
      }
    </div>
  )
}

export default App