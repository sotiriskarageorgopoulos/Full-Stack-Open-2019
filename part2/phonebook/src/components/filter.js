import React from 'react'

const Filter = ({filteredValue,handleFilter}) => {
   return ( 
    <form>
       <div>
        <p>filter shown with <input value={filteredValue} onChange={handleFilter} /></p>
    </div>
 </form>)
}

export default Filter