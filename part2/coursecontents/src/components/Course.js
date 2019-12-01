import React from 'react' 
import Part from './Part'
import Header from './Header'
import Total from './Total'

const Content = ({parts}) => {
    return (
        <>
        {parts.map(p=>(<Part key={p.id} name={p.name} exercises={p.exercises}/>))}
        </>
    )
}

const Course = ({name,parts}) => {
    return (
        <div>
          <Header name={name}/>
          <Content parts={parts}/>
          <Total parts={parts}/>
        </div>
    )
}

export default Course
