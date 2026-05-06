var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs_array) => {
    // returns the sum of all likes in blogs_array param
    // Ex. blogs_array = [{likes: 1}, {likes: 5}]
    // Returns 6 likes total

    const totalLikes = blogs_array.reduce((accum, currentVal) => {
        return accum + currentVal.likes
    }, 0)

    return totalLikes
}

const favoritBlog = (blogs_array) => {
    // input: list of blogs as an array of objects
    // output: returns the blogs with the most likes, if there are multiple, then return any one of them

    const indexOfMostLiked = blogs_array.reduce((accum, current, index) => {
        let value = 0;

        if (current.likes > accum) { 
            accum = current.likes 
            value = index 
        }

        return index
    }, 0)

    return blogs_array[indexOfMostLiked]
}

const mostBlogs = (blogs_array) => {
    // const b =  [
    //     { author: 'aaa', blogs: 5 },
    //     { author: 'bbb', blogs: 1 },
    //     { author: 'ccc', blogs: 14 },
    //     { author: 'ddd', blogs: 12 },
    //     { author: 'eee', blogs: 1 },
    //     { author: 'fff', blogs: 33 },
    //     { author: 'ggg', blogs: 32 },
    //     { author: 'hhh', blogs: 11 }
    // ]

    const indexOfMostBlogs = blogs_array.reduce((maxIdx, currentItem, currentIdx, array) => {
        return currentItem.blogs > array[maxIdx].blogs ? currentIdx : maxIdx;
    }, 0);

    return blogs_array[indexOfMostBlogs]
}

const mostLikes = (blogs_array) => {
    // const b =  [
    //     { author: 'aaa', blogs: 5, likes: 2 },
    //     { author: 'bbb', blogs: 1, likes: 1 },
    //     { author: 'ccc', blogs: 14, likes: 1 },
    //     { author: 'ddd', blogs: 12, likes:1 },
    //     { author: 'eee', blogs: 1, likes: 1 },
    //     { author: 'fff', blogs: 33, likes: 1 },
    //     { author: 'ggg', blogs: 32, likes: 1},
    //     { author: 'hhh', blogs: 11, likes: 1 }
    // ]

    const indexOfMostLiked = blogs_array.reduce((maxIdx, currentItem, currentIdx, array) => {
  return currentItem.likes > array[maxIdx].likes ? currentIdx : maxIdx;
}, 0);

    return blogs_array[indexOfMostLiked]
}

module.exports = {
  dummy,
  totalLikes,
  favoritBlog,
  mostBlogs,
  mostLikes
}