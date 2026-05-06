const showData = (req,res, next) => {
    console.log('URL --', req.url)
    console.log('Method --', req.method)
    console.log('Body --', req.body)
    next()
}

module.exports = showData