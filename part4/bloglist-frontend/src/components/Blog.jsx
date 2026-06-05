import Togglable from "./Togglable"
import { useState } from 'react'

const Blog = ({ blog, handleIncreaseLikes, handleDelete }) => {
  const [ visible, setVisible ] = useState(false)

  const show = { 
    display: visible ? '' : 'none', 
    border: '1px solid black',
    padding: '10px',
    borderRadius: '5px',
    width: 'fit-content'
  }

  return (
    <div>
      <p>{blog.title} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></p> 
      <div style={show}>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => handleIncreaseLikes(blog)}>like</button></p>
        <p>author: {blog.author.name}</p>
        <button onClick={() => window.confirm(`Do you want to delete ${blog.title}?`) ? handleDelete(blog) : null}>delete</button>
      </div>
    </div>
  )
} 
  

export default Blog