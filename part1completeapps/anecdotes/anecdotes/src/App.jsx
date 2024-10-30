import { useState } from 'react'

const App = () => {
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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) // Initialize votes array with 0 for each anecdote

  // Function to select a random anecdote
  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Function to vote for the current anecdote
  const handleVote = () => {
    const newVotes = [...votes] // Create a copy of the current votes array
    newVotes[selected] += 1 // Increment the vote for the current anecdote
    setVotes(newVotes) // Update the state with the new votes array
  }

  // Find the anecdote with the most votes
  const maxVotes = Math.max(...votes) // Get the highest vote count
  const topAnecdoteIndex = votes.indexOf(maxVotes) // Find the index of the anecdote with the most votes

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandomAnecdote}>Next Anecdote</button>

      <h1>Anecdote with Most Votes</h1>
      {maxVotes > 0 ? ( // Only display if there is at least one vote
        <div>
          <p>{anecdotes[topAnecdoteIndex]}</p>
          <p>Has {maxVotes} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App
