import React from 'react'

const PersonForm = ({addName,newName,handleName,newNumber,handleTelNum}) => {
   return (
    <form onSubmit={addName}>
    <div>
      <p>name: <input value={newName} onChange={handleName}/></p>
    </div>
    <div>
      <p>number: <input value={newNumber} onChange={handleTelNum}/></p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
   )
}

export default PersonForm