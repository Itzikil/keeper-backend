const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addSubGroup, getSubGroups, deleteSubGroup, updateSubGroup} = require('./subGroup.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getSubGroups)
// router.post('/',  log, requireAuth, addSubGroup)
// router.delete('/:id',  requireAuth, deleteSubGroup)
router.put('/:id', updateSubGroup)
router.post('/',  log, addSubGroup)
router.delete('/:id', deleteSubGroup)

module.exports = router