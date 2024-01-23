import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const addAnecdote = async(newAnecdote) => {
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

export const voteAnecdote = async(updatedAnecdote) => {
    const res = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return res.data
}