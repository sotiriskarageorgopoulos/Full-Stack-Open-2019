import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllPersons = () => {
    const result = axios.get(baseUrl)
    return result.then(response => response.data)
}

const addPerson = (person)  => {
    const result = axios.post(baseUrl,person)
    return result.then(response => response.data)
}

export default {getAllPersons,addPerson}