const blogListRouter = require('express').Router()
const Blog = require('../modules/blogList.js')

// write the routes
blogListRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogListRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  console.log('Blogsssssssssssssssssss,' , blog)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogListRouter