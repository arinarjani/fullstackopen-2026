const { test, describe } = require('node:test')
const assert = require('node:assert')

const { average, reverse } = require('../utils/for_testing.js')
const { dummy, 
        totalLikes, 
        favoritBlog,
        mostBlogs,
        mostLikes
    } = require('../utils/list_helper.js')

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})

test('reverse of arin', () => {
    const result = reverse('arin')

    assert.strictEqual(result, 'nira')
})

describe('average', () => {
    test('average of one is itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('average of [1,2,3,4,5]', () => {
        assert.strictEqual(average([1,2,3,4,5]), 3)
    })

    test('average of nothing is 0', () => {
        assert.strictEqual(average([]), 0)
    })
})

describe('exercises 4.3 - 4.4', () => {
    
    test('always returns 1', () => {
        assert.strictEqual(dummy([1,2,3,4,5,6,7,8,9]), 1)
    })
    
    test('sum of all likes for three blogs with likes of 5, 1, and 20 respectively', () => {
        const blogs = [
            {likes: 5},
            {likes: 1},
            {likes: 20}
        ]

        assert.strictEqual(totalLikes(blogs), 26)
    })
})

describe('exercise 4.5: return the blog with the most likes', () => {
    const blogs = [
        { likes: 5 },
        { likes: 1 },
        { likes: 20 },
        { likes: 30 },
        { likes: 30 }
    ]
    test('blog with most likes: 5, 1, 20 respectively', () => {
        assert.deepStrictEqual(favoritBlog(blogs), { likes: 30 })
    })
})

describe('exercise 4.6: return the blog where the author has the most blogs', () => {
    const b =  [
        { author: 'aaa', blogs: 5 },
        { author: 'bbb', blogs: 1 },
        { author: 'ccc', blogs: 14 },
        { author: 'ddd', blogs: 12 },
        { author: 'eee', blogs: 1 },
        { author: 'fff', blogs: 33 },
        { author: 'ggg', blogs: 32 },
        { author: 'hhh', blogs: 11 }
    ]
    test('blog with most likes: 5, 1, 14, 12, 1, 33, 32, 11 respectively', () => {
        assert.deepStrictEqual(mostBlogs(b), { author: 'fff', blogs: 33 })
    })
})

describe('exercise 4.7: return the blog where the author has the most likes', () => {
    const b =  [
        { author: 'aaa', blogs: 5, likes: 2 },
        { author: 'bbb', blogs: 1, likes: 1 },
        { author: 'ccc', blogs: 14, likes: 1 },
        { author: 'ddd', blogs: 12, likes:1 },
        { author: 'eee', blogs: 1, likes: 1 },
        { author: 'fff', blogs: 33, likes: 1 },
        { author: 'ggg', blogs: 32, likes: 1},
        { author: 'hhh', blogs: 11, likes: 1 }
    ]

    test('blog with most likes: 2, 1, 1, 1, 1, 1, 1, 1 respectively', () => {
        assert.deepStrictEqual(mostLikes(b), { author: 'aaa', blogs: 5, likes: 2 })
    })
})