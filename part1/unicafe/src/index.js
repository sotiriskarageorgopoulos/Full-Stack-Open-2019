import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleGoodReview,handleBadReview,handleNeutralReview}) => {
    return(
        <>
        <h1>give feedback</h1>
        <button onClick={handleGoodReview}>good</button>
        <button onClick={handleNeutralReview}>neutral</button>
        <button onClick={handleBadReview}>bad</button>
        </>
        )
}

const Statistic = ({text,value}) => {
    if(text === "positive") return (<p>{text} {value} %</p>)
    return(<p>{text} {value}</p>)
}


const Statistics = ({good,bad,neutral}) => {
    const numberOfFeedBacks = () => {
      return good + neutral + bad
    }

    const averageOfFeedBacks = () => {
       return (good - bad)/numberOfFeedBacks()
    }

    const positiveFeedBacks = () => {
       return (good/numberOfFeedBacks())*100
    }
   
    if(numberOfFeedBacks() === 0){
        return(
            <>
            <h1>Statistics</h1>
            <p>No feedback given</p>
            </>
        )
    }

    return(
    <>
      <h1>Statistics</h1>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={numberOfFeedBacks()}/>
      <Statistic text="average" value={averageOfFeedBacks()}/>
      <Statistic text="positive" value={positiveFeedBacks()}/>
    </>
        )
}

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

  return (
    <div>
        <Button handleGoodReview={handleGoodReview} handleBadReview={handleBadReview} handleNeutralReview={handleNeutralReview}/>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)