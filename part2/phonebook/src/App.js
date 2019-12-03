import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredValue, setFilteredValue ] = useState('')
  const [ isFiltered, setIsFiltered ] = useState(false)

  const handleName = (event) => {
      setNewName(event.target.value)
  }

  const handleTelNum = (event) => {
      setNewNumber(event.target.value)
  }

  const addName = (event) => {
        event.preventDefault()
        const isExist = persons.filter(p => p.name === newName)
        if(isExist.length !== 0){
           alert(`${newName} is already added to phonebook`)
           setNewName('')
           setNewNumber('')
        }
        else {
          const person = {
              id: persons.length+1,
              name: newName,
              tel: newNumber
          }
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        }
  }

  const display = () =>{
      if(isFiltered) {
        return (
          <>
          {persons.map(p=>{
             if(p.name.toLowerCase().includes(filteredValue.toLowerCase()) 
             || p.name.toUpperCase().includes(filteredValue.toUpperCase())) 
             { 
               return (<p key={p.id}> {p.name} {p.tel} </p>) 
             }
             return ''
          })}
          </>
          )}
      else {
        return (
           <>
            {persons.map(p=>(<p key={p.id}> {p.name} {p.tel} </p>))}
           </>
           )}
  }

  const handleFilter = (event) =>{
    setIsFiltered(true)
    setFilteredValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredValue={filteredValue} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}
                  newName={newName}
                  handleName={handleName}
                  newNumber={newNumber}
                  handleTelNum={handleTelNum}/>
      <h2>Numbers</h2>
       {display()}
    </div>
  )
}

export default App