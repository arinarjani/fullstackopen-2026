import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFromRef = useRef()

  useEffect(() => {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const localUser = window.localStorage.getItem('blogUser')
    // see if localStorage is there
    if (localUser) {
      // parse the localUser to an object
      const parsedUser = JSON.parse(localUser)

      setUser(parsedUser)

      // set the token
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // log into the server
      const returnedUser = await login({username, password})
      
      // set the user to the returned user after loggin in
      setUser(returnedUser)
  
      // set localStorage with user
      window.localStorage.setItem('blogUser', JSON.stringify(returnedUser))
  
      // set token from returnedUser
      blogService.setToken(returnedUser.token)
      
      // set the input text fields to ''
      setUsername('')
      setPassword('')

      // show message of success
      setMessage(`${returnedUser.name} logged in!!!`)
      setTimeout(() => setMessage(''), 5000)
      
    } catch (error) {
      setMessage(error)
      setTimeout(() => setMessage(''), 5000)
    }

  }

  const handleAddBlog = async (blog) => {
    try {
      // add blog do the db
      const createdBlog = await blogService.addBlog(blog)
  
      // add createdBlog to the blogs state
      setBlogs(oldBlog => oldBlog.concat(createdBlog))
  
      // show message of success
      setMessage(`${createdBlog.title} added!!!`)
      setTimeout(() => setMessage(''), 5000)
  
      // hide the 'create new blog' form
      blogFromRef.current.toggleVisible()
    } catch (error) {
      setMessage(error)
      setTimeout(() => setMessage(''), 5000)
    }

  }

  const handleIncreaseLikes = async ( blog ) => {
    await blogService.increaseLikes( blog)

    // erase blogs state and populate it with the blogs in the db
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)

    // I thought this would erase the delay in the updating on the 
    // front-end, but I think it's the server issue causing the delay
    // const s = blogs.map(blog => {
    //   if ( blog.id === response.id ) {
    //     return { ...blog, likes: blog.likes + 1 }
    //   }
    //   return blog
    // })

    // setBlogs(s)

  }

  const handleDelete = async ( blog ) => {
    // delete blog
    await blogService.deleteBlog( blog )

    // erase blogs state and populate it with the blogs in the db
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleLogout = () => {
    try {
      // clear localStorage
      window.localStorage.clear()
  
      // delete user
      setUser(null)
  
      // delete token
      blogService.setToken(null)

      // show message of success
      setMessage(`You are logged out!!!`)
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      setMessage(error)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <>
      {message.length > 0 && <Notification message={message} />}
      <div>
        {
          !user 
          &&
          <Login loginFormData={{handleLogin, username, password, setPassword, setUsername}} />
        }

        {
          user &&
        <div>
          <h3>{user.name} is logged in</h3> <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.sort((a,b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleIncreaseLikes={handleIncreaseLikes} handleDelete={handleDelete} />
          )}
          <Togglable buttonLabel={'create new blog'} ref={blogFromRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
        </div>
        }
      </div>
    </>
  )
}

export default App