import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addBlog = async ( blog ) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const increaseLikes = async ( blog ) => {

  const config = {
    headers: {Authorization: token}
  }

  await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes: blog.likes + 1}, config)
}

const deleteBlog = async ( blog ) => {
  const config = {
    headers: {Authorization: token}
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, addBlog, setToken, increaseLikes, deleteBlog }