import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
      blogService.getAll().then(blogs => {
        // console.log(blogs)
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

  const handleAddBlog = async ( e ) => {
    e.preventDefault()

    try {
      // create the a new blog
      const newBlog = {
        title,
        author,
        url,
        likes
      }
  
      // add the blog to the db
      const createdBlog = await blogService.addBlog(newBlog)
  
      console.log(createdBlog)
  
      // conact new blog to the blogs state
      setBlogs(oldblogs => oldblogs.concat(createdBlog))

      // show message of success
      setMessage(`${createdBlog.title} added!!!`)
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      setMessage(error)
      setTimeout(() => setMessage(''), 5000)
    }
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
          <Login data={{handleLogin, username, password, setPassword, setUsername}} />
        }

        {
          user &&
        <div>
          <h3>{user.name} is logged in</h3> <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <form onSubmit={handleAddBlog}>
            <label htmlFor="title">
              title: 
              <input type="text" name="title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label htmlFor="author">
              author: 
              <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </label>
            <label htmlFor="url">
              url: 
              <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
            </label>
            <label htmlFor="likes">
              likes: 
              <input type="number" name="title" value={likes} onChange={(e) => setLikes(e.target.value)}/>
            </label>
            <button>add</button>
          </form>
        </div>
        }
      </div>
    </>
  )
}

export default App