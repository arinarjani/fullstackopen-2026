const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author.name} {blog.likes}
  </div>  
)

export default Blog