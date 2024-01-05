const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addItem, getItems, deleteItem, updateItem} = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getItems)
// router.post('/',  log, requireAuth, addItem)
// router.delete('/:id',  requireAuth, deleteItem)
router.put('/:id', updateItem)
router.post('/',  log, addItem)
router.delete('/:id', deleteItem)

module.exports = router