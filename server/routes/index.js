const Router = require('express')
const router = new Router()
const carsRouter = require('./carsRouter')

router.use('/cars', carsRouter)

module.exports = router