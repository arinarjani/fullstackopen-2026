import axios from 'axios'

const url = '/api/persons'

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const add = (person) => {
    return axios.post(url, person)
                .then(response => response.data)
                .catch(error => {
                    return error.response.data
                })
}

const erase = (id) => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}

const update = (updatedPerson) => {
    return axios.put(`${url}/${updatedPerson.id}`, updatedPerson)
                .then(response => response.data)
                .catch(error => {
                    return error.response.data
                })
}

export { add, getAll, erase, update }