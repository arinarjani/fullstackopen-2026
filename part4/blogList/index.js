const app = require('./app.js')
const { PORT } = require('./utils/config.js')
const logger = require('./utils/logger.js')

app.listen(PORT || 3003, () => {
  logger.info(`Server running on port ${PORT}`)
})