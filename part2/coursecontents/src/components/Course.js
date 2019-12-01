import React from 'react';
import Part from './Part';
import Header from './Header'

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
        </div>
    )
}

export default Course
