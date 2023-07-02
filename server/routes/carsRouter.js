const Router = require('express')
const router = new Router()
const carsController = require('../controllers/carsController')

router.post('/add', carsController.create)
router.post('/change', carsController.change)
router.post('/delete', carsController.delete)
router.get('/', carsController.getAll)

module.exports = router