const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addGroup, getGroups, deleteGroup, updateGroup} = require('./group.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getGroups)
// router.post('/',  log, requireAuth, addGroup)
// router.delete('/:id',  requireAuth, deleteGroup)
router.put('/:id', updateGroup)
router.post('/',  log, addGroup)
router.delete('/:id', deleteGroup)

module.exports = router