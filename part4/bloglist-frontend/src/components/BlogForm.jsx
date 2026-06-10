import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = ( e ) => {
    // prevent page from reloading
    e.preventDefault()

    // create the blog
    const newBlog = {
      title,
      author,
      url,
      likes
    }

    // add blog to db
    createBlog(newBlog)

    // clear the form inputs
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  // const { handleAddBlog, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes } = blogFormData
  return (
    <div>
      <form onSubmit={addBlog}>
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
          <input type="number" name="likes" value={likes} onChange={(e) => setLikes(e.target.value)}/>
        </label>
        <button>add</button>
      </form>
    </div>
  )
}

export default BlogForm