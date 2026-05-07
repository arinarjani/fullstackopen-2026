require('dotenv').config()

const showData = (req,res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('URL --', req.url)
        console.log('Method --', req.method)
        console.log('Body --', req.body)
    }
    next()
}

module.exports = showData