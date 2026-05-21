const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../modules/user')
const Blog = require('../modules/blogList')
const app = require('../app.js')
const supertest = require('supertest')

const api = supertest(app)

// THIS IS THE TEST FOR USERS/LOGGING IN/BLOGS, NOT BLOG.TEST.JS AS THAT IS A MESSSSSSSSSSS

beforeEach(async () => {
        // clear the db from blogs and users
        await Blog.deleteMany({})
        await User.deleteMany({})

        // create a user
        const user = await api
            .post('/api/users')
            .send({
                "username": "rooter",
                "name": "ro",
                "password": "rooter"
            })

        // login to get a token
        const { body } = await api
            .post('/api/login')
            .send({
                "username": "rooter",
                "password": "rooter"
            })

        // create a blog
        const createdBlog = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${body.token}`)
            .send({
                "title": "root",
                "author": "root",
                "url": "eric_s.com",
                "likes": 4
            })
})

test('There is 1 user in the blog', async () => {
    // get all user in the db
    const users = await User.find({})

    assert.strictEqual(users.length, 1)
})

test('adding a user with a username shorter than 3 characters creates an error', async () => {
    // get all user in the db
    const usersAtStart = await User.find({})

    // create a user with too short of a username
    const invalidUser = {
        username: 'ar',
        name: 'ar',
        password: 'arin'
    }

    // try to add the user to the db via supertest
    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(500)

    // get users at the end of all the logic
    const usersAtEnd = await User.find({})

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('adding a user with a password shorter than 3 characters creates an error', async () => {
    // get all user in the db
    const usersAtStart = await User.find({})

    // create a user with too short of a username
    const invalidUser = {
        username: 'arin',
        name: 'ar',
        password: 'ar'
    }

    // try to add the user to the db via supertest
    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

    // get users at the end of all the logic
    const usersAtEnd = await User.find({})

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('4.23: adding a blog works with token auth; 2 blogs now', async () => {
    // get the # of blogs at the beginning
    const blogsAtBeginning = await Blog.find({})

    // login to get a token (I am using the same user and pass from the beforeEach above)
    const { body } = await api
        .post('/api/login')
        .send({
            "username": "rooter",
            "password": "rooter"
        }).expect(200)

    // create a blog
    const createdBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${body.token}`)
        .send({
            "title": "eric",
            "url": "eric_sparrow.com",
            "likes": 10000
        }).expect(201)

    // get # of blogs after adding a blog
    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, blogsAtBeginning.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})

// how you test just this file
// NODE_ENV=test node --test --watch ./tests/user.test.js