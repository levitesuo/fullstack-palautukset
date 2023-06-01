import { useState } from 'react'

const Butto = ({text, clickEvent}) => <button onClick={clickEvent}>{text}</button>
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({bad,neutral,good}) => {
  const all = bad + neutral + good
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={all} />
          <StatisticLine text={'average'} value={(bad*-1 + good) / all} />
          <StatisticLine text={'positive'} value={good/all*100 + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Butto
        text = 'good'
        clickEvent={() => setGood(good + 1)}
      />
      <Butto
        text = 'neutral'
        clickEvent={() => setNeutral(neutral + 1)}
      />
      <Butto
        text = 'bad'
        clickEvent={() => setBad(bad + 1)}
      />
      <Statistics
        bad = {bad}
        neutral={neutral}
        good={good}
      />
    </div>
  )
}

export default App