const blogListRouter = require('express').Router()
const Blog = require('../modules/blogList.js')

// write the routes
blogListRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})

    response.status(200).json(allBlogs)
})

blogListRouter.post('/', async (request, response, next) => {
    const newBlog = {
      ...request.body,
      likes: request.body.likes || 0
    }

    try {
      const createdBlog = await Blog.create(newBlog)
      response.status(201).json(createdBlog)
    } catch (error) {
      next(error)
    }
})

blogListRouter.delete('/:id', async (request, response, next) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
      response.status(200).end()
    } catch (error) {
      next(error)
    }
})

blogListRouter.put('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        const body = request.body

        const updatedBlog = await Blog.findByIdAndUpdate(id, body)

        response.status(200).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogListRouter