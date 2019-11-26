import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodReview = () => {
         setGood(good + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const numberOfFeedBacks = () => {
      return good + neutral + bad
  }

  const averageOfFeedBacks = () => {
     return (good - bad)/numberOfFeedBacks()
  }

  const positiveFeedBacks = () => {
      return (good/numberOfFeedBacks())*100
  }

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={handleGoodReview}>good</button>
        <button onClick={handleNeutralReview}>neutral</button>
        <button onClick={handleBadReview}>bad</button>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {numberOfFeedBacks()}</p>
      <p>average {averageOfFeedBacks()}</p>
      <p>positive {positiveFeedBacks()} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)