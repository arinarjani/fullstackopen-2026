const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../modules/blogList.js')
// const helper = require('./test_helper.js')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

const testBlogs = [
    {
        title: 'arin',
        author: 'arin',
        url: 'arin@gmail.com',
        likes: 1,
    },
    {
        title: 'mayra',
        author: 'mayra',
        url: 'mayra@gmail.com',
        likes: 2,
    }
]

const newBlog = {
    title: 'eric',
    author: 'eric sparrow',
    url: 'eric_sparrow@gmail.com',
    likes: 25
}

const newBlogWithoutLikes = {
    title: 'eric',
    author: 'eric sparrow',
    url: 'eric_sparrow.com'
}

const newBlogWithoutTitleOrURL = {
    author: 'eric sparrow',
    likes: 25
}

beforeEach(async () => {
    // erase all data in DB
    await Blog.deleteMany({})

    // add some data in DB
    await Blog.insertMany(testBlogs)
})

describe('exercise 4.8: make a GET request to the db and verify the correct # of blogs is returned', () => {
    test('get all the blogs from db, and verify there are 2 blogs in the db', async () => {
        // get all the blogs from the db
        const allBlogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

            assert(allBlogs.body.length, 2)
    })
})

describe('exercise 4.9: make sure the blogs have and id and not _id', () => {
    test('blogs have an id', async () => {
        // get all the blogs from the db
        const allBlogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // 1st: get all the properties from each blog
        // output: [ [ 'title', 'author', 'url', 'likes', 'id' ], [ 'title', 'author', 'url', 'likes', 'id' ] ]
        // 2nd: extract the 'id' value from each array, and create another array with only 'id' in it
        // output: [ ['id'], ['id'] ]
        const extractId = allBlogs.body.map(blog => Object.keys(blog)).map(keys => keys.filter(key => key === 'id'))

        // verify the extractId variable only has 'id' in it
        assert.deepStrictEqual(extractId, [['id'], ['id']])
    })
})

describe('exercise 4.10: create a POST request to the db', () => {
    test('make sure the POST request works by seeing if the total blogs # has increased by 1', async () => {
        // get total blogs at the start
        const blogsAtStart = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // create a blog post
        await api.post('/api/blogs')
                 .send(newBlog)
                 .expect(201)

        // get total blogs at the end
        const blogsAtEnd = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // test to see if the total blogs length increased by 1
        assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
    })
})

describe('exercise 4.11', async () => {
    test('If I add a blog without likes, I get a default likes of 0', async () => {
        const createdBlog = await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)

        assert.strictEqual(createdBlog.body.likes, 0)
    })
})

describe('exercise 4.12', () => {
    test('if a new blog added doesn\'t have the \'url\' or \'title\', then response with 400', async () => {
        await api.post('/api/blogs')
                 .send(newBlogWithoutTitleOrURL)
                 .expect(500)
    })
})

describe('exercise 4.13', () => {
    test('Deleting a note works', async () => {
        // get all blogs before delete
        const blogsAtStart = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // delete the last blog
        await api.delete(`/api/blogs/${blogsAtStart.body[blogsAtStart.body.length -1].id}`)
                 .expect(200)
        
        // get all blogs after delete
        const blogsAtEnd = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
    })
})

describe('exericise 4.14', () => {
    test('Updating a note works', async () => {
        // get all blogs before update
        const allBlogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // update the last blog
        await api
            .put(`/api/blogs/${allBlogs.body[allBlogs.body.length - 1].id}`)
            .send(newBlog)
            .expect(200)

        // get all blogs after updated
        const allBlogsAfterUpdate = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(newBlog.likes, allBlogsAfterUpdate.body[allBlogsAfterUpdate.body.length - 1].likes)
    })
})

after(async () => {
  await mongoose.connection.close()
})