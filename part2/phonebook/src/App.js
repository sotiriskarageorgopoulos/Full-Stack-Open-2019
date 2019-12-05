import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredValue, setFilteredValue ] = useState('')
  const [ isFiltered, setIsFiltered ] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
         .then(response => setPersons(response.data))
  },[])

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
              name: newName,
              number: newNumber,
              id: persons.length+1,
          }
          
          setNewName('')
          setNewNumber('')

          axios.post('http://localhost:3001/persons',person)
               .then( response =>{
                  setPersons(persons.concat(response.data))
               })
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
               return (<p key={p.id}> {p.name} {p.number} </p>) 
             }
             return ''
          })}
          </>
          )}
      else {
        return (
           <>
            {persons.map(p=>(<p key={p.id}> {p.name} {p.number} </p>))}
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