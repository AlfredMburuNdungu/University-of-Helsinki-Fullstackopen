import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />

      {total > 0 ? (
        <div>
          <h1>Statistics</h1>
          <Statistics 
            good={good} 
            neutral={neutral} 
            bad={bad} 
            total={total} 
            average={average} 
            positivePercentage={positivePercentage} 
          />
        </div>
      ) : (
        <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </div>

      )}
    </div>
  )
}

export default App
