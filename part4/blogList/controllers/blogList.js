require('dotenv').config()

const blogListRouter = require('express').Router()
const Blog = require('../modules/blogList.js')
const User = require('../modules/user.js')
const jwt = require('jsonwebtoken')

// write the routes
blogListRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('author', {username: 1, name: 1})

    response.status(200).json(allBlogs)
})

blogListRouter.post('/', async (request, response, next) => {
    // get data sent from user
    const body = request.body

    // if the decodedToken doesn't return an object with an .id, then return 401
    if (!request.user.id) {
      return response.status(401).json({error: 'token invalid'})
    }

    // find the user that matches the userId from decodedToken
    const user = await User.findById(request.user.id)

    if (!user) {
      return response.status(401).json({error: 'userId missing or invalid user'})
    }

    // build the blogPost
    const newBlog = {
      ...request.body,
      likes: request.body.likes || 0,
      author: user._id
    }

    try {
      // save the blog to the db
      const createdBlog = await Blog.create(newBlog)

      // save the createdBlog to the user who created it in the db
      user.blogs = user.blogs.concat(createdBlog)
      await user.save()

      response.status(201).json(createdBlog._id)
    } catch (error) {
      next(error)
    }
})

blogListRouter.delete('/:id', async (request, response, next) => {
    // if decodedToken doesn't return an id, respond with 401
    if (!request.user.id) {
      return response.status(401).json({error: 'token invalid'})
    }

    // find the user that matches the userId from decodedToken
    const user = await User.findById(request.user.id)

    if (!user) {
      return response.status(401).json({error: 'userId missing or invalid user'})
    }

    // get the blog to delete based on request.params.id (the url id)
    const blogToDelete = await Blog.findById(request.params.id)

    // console.log('user._id', user._id.toJSON())
    // console.log('blogToDelete.author._id', blogToDelete.author._id.toJSON())
    // console.log(blogToDelete.author._id.toJSON() === user._id.toJSON())

    if (blogToDelete.author._id.toJSON() === user._id.toJSON()) {
      try {
        // delete the blog
        const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

        // filter out the array containing the blog that was deleted by using the blog id
        user.blogs = user.blogs.filter(blog => blog._id.toJSON() !== request.params.id)
        await user.save()

        response.status(200).end()
      } catch (error) {
        next(error)
      }
    }

    // try {
    //   const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    //   response.status(200).end()
    // } catch (error) {
    //   next(error)
    // }
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