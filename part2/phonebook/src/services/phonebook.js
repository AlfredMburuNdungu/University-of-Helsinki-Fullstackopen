import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)
const deletePerson = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default { getAll, create, deletePerson }
