import React, { useState,useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import servicePerson from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredValue, setFilteredValue ] = useState('')
  const [ isFiltered, setIsFiltered ] = useState(false)

  useEffect(()=>{
    servicePerson.getAllPersons()
                 .then(person => setPersons(person))
  },[])

  const handleName = (event) => {
      setNewName(event.target.value)
  }

  const handleTelNum = (event) => {
      setNewNumber(event.target.value)
  }

  const addName = (event) => {
        event.preventDefault()
        const isExistPerson = persons.filter(p => p.name === newName)
        
        if(isExistPerson.length !== 0){
          if(window.confirm(`${isExistPerson[0].name} is already added to phonebook, replace the old number with a new one?`)){
        
              let id = isExistPerson[0].id
              const person = {
                name: newName,
                number: newNumber,
                id: id,
              }

              servicePerson.updatePerson(id,person)
                           .then(returnedPerson => {
                              setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
                           })
          
            setNewName('')
            setNewNumber('')
          }
        }
        else {
          const person = {
            name: newName,
            number: newNumber,
            id: persons.length+1,
          }

          setNewName('')
          setNewNumber('')
 
          servicePerson.addPerson(person)
                       .then(person =>{
                          setPersons(persons.concat(person))
                        })
        }
  }

  const handleDelButton = (event) => {
     event.preventDefault()
     const id = event.target.value
     let person = persons.filter(p => p.id == id)
     if(person !== null){
        if(window.confirm(`Delete ${person[0].name} ?`)){
          servicePerson.deletePerson(id) 
          window.location.reload(true);
        }
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
               return (<p key={p.id}> {p.name} {p.number} <button value={p.id} onClick={handleDelButton}>delete</button></p>) 
             }
             return ''
          })}
          </>
          )}
      else {
        return (
           <>
            {persons.map(p=>(<p key={p.id}> {p.name} {p.number}<button value={p.id} onClick={handleDelButton}>delete</button></p>))}
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