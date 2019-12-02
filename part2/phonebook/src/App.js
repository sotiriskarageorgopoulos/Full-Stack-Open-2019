import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', tel:'040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      return (
          <>
          {persons.map(p=>(<p key={p.id}> {p.name} {p.tel} </p>))}
          </>
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                 value={newName}
                 onChange={handleName}
                 />
        </div>
        <div>
          number: <input 
                value={newNumber}
                onChange={handleTelNum}    
          />
        </div>
        <div>
          <button  type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {display()}
    </div>
  )
}

export default App