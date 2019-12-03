import React, { useState } from 'react'

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
             if(p.name.includes(filteredValue)) { return (<p key={p.id}> {p.name} {p.tel} </p>) }
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
      <form>
         <div>
         filter shown with <input 
                    value={filteredValue}
                    onChange={handleFilter}
         />
         </div>
      </form>
      <h3>Add a new</h3>
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