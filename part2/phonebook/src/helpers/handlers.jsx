// const handlePhonebookSubmit = (e) => {
//     e.preventDefault()

//     const foundOrNot = persons.find( ({name}) => name.toLowerCase() === newName.toLowerCase() )

//     !foundOrNot ? 
//       setPersons(persons.concat({name: newName, number: newNumber, id:persons.length + 1})) :
//       alert(`${newName} is already in the phonebook. Try again.`)

//     setNewName('')
//     setNewNumber('')
//   }

//   const handleNewNameChange = (e) => {
//     setNewName(e.target.value)
//   }

//   const handleNewNumberChange = (e) => {
//     setNewNumber(e.target.value)
//   }

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//   }

//   export {
//     handlePhonebookSubmit,
//     handleNewNameChange,
//     handleNewNumberChange,
//     handleSearch
//   }