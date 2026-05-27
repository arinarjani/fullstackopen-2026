import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
    const request = await axios.post(baseUrl, credentials)
    return request.data
}

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

export default { login }