import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  let [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from(Array(props.anecdotes.length), () => 0));
  
  const handleAnecdotes = () => {
      setSelected(selected=Math.floor(Math.random()*props.anecdotes.length))
  }
 
  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const firstVotedPos = () => {
      let max = votes[0]
      let maxPos = 0
      for(let i=1;i<votes.length;i++){
          if(votes[i] > max){
              max = votes[i]
              maxPos = i
          }
      }
      return maxPos
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleAnecdotes}>next anecdote</button>
      </div> 
      <h1>Anecdote with most votes</h1> 
      {props.anecdotes[firstVotedPos()]}
      <p>has {votes[firstVotedPos()]} votes</p> 
      <div>
      </div>
   </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)