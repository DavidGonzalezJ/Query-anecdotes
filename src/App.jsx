import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { setNotification, hideNotification, useNotifDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()

  //Notification callback
  const showNotification = (text, seconds) => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(hideNotification()), seconds*1000)
  }

  //Query to vote an anecdote
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const anecdotesUpdated = anecdotes.map(a => a.id === newAnecdote.id ?
        newAnecdote : a)
      queryClient.setQueryData(['anecdotes'], anecdotesUpdated)
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate(votedAnecdote)
    showNotification(`Anecdote: '${anecdote.content}' has been voted`, 3)
  }

  //Query to retrieve anecdotes in the server
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
