import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleName = (event) => {
      setNewName(event.target.value)
  }

  const addName = (event) => {
        event.preventDefault()
        console.log(newName)
        const isExist = persons.filter(p => p.name === newName)
        console.log(isExist)
        if(isExist.length !== 0){
           alert(`${newName} is already added to phonebook`)
           setNewName('')
        }
        else {
          const person = {
              name: newName
          }
          setPersons(persons.concat(person))
          setNewName('')
        }
  }

  const displayNames = () =>{
      return (
          <>
          {persons.map(p=>(<p key={p.id}> {p.name} </p>))}
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
          <button  type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {displayNames()}
    </div>
  )
}

export default App