import { useQueryClient, useMutation } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import {setNotification,hideNotification, useNotifDispatch} from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()

  const showNotification = (text, seconds) => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(hideNotification()),seconds*1000)
  }

  //Query to add a new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })
  //Callback for the submit
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0 })
    showNotification(`Anecdote '${content}' has been created`,3)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
