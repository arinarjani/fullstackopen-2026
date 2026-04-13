import { useState } from "react"

const StatisticLine  = ( { text, value = 0 } ) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = ( { text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState([0,0,0,0,0,0,0,0])

  const handleFeedback = (e) => {
    switch (e.target.textContent.toLowerCase()) {
      case 'good':
          setGood(good => good + 1)
        break;
      case 'neutral':
        setNeutral(n => n + 1)
        break;
      case 'bad':
        setBad(bad => bad + 1)
        break;
      default:
        break;
    }
    setTotal(t => t + 1)
  }

  console.log();
  

  const handleAnectdoteVote = () => {
    // use map to loop over the array and once found the index of the selected anecdote, increase by one, then update votes state
    setVotes(votes.map( (elem, index) => index === selected ? elem + 1 : elem ))
  }

  const handleRandomButton = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button text={'good'} handleClick={handleFeedback} />
        <Button text={'neutral'} handleClick={handleFeedback} />
        <Button text={'bad'} handleClick={handleFeedback} />
      </div>
      <h2>Statistics</h2>
      {total > 0 ? 
      <>
        <StatisticLine text={'Good'} value={good} />
        <StatisticLine text={'Neutral'} value={neutral} />
        <StatisticLine text={'Bad'} value={bad} />
        <StatisticLine text={'Total'} value={total} />
        <StatisticLine text={'Average'} value={ total > 0 ? (good - bad) / total : 0 }  />
        <StatisticLine text={'Positive'} value={ total > 0 ? good / total * 100 : 0 } />
      </>
        :
        'No Feedback given'
      }
      <h2>Anecdotes</h2>
      <div>
        <Button text={'random anecdote'} handleClick={handleRandomButton} />
        <Button text="vote" handleClick={handleAnectdoteVote} />
      </div>
      <p>{anecdotes[selected]}</p>
      <h2>Mote Voted Anecdote</h2>
      {/* this finds the highest number in votes, then get that index, then passes that index to anecdotes[indexFound] to display the most liked anecdote */}
      <p>{ votes.reduce((a,b) => Math.max(a,b), 0) > 0 ? anecdotes[ votes.indexOf( votes.reduce((a,b) => Math.max(a,b), 0) ) ] : 'please vote' }</p>
    </>
  )
}

export default App
