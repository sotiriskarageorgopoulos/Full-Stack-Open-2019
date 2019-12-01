import React from 'react'

const Total = ({parts}) => {
    const total = parts.reduce((num1,num2)=>num1+num2.exercises,0)
    return(
        <>
          <p><strong>total of {total} exercises</strong></p>
        </>
        )
}

export default Total