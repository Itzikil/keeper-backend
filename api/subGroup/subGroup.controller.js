const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const subGroupService = require('./subGroup.service')

async function getSubGroups(req, res) {
    try {
        const filterBy = {
            group: req.query.group || '',
        }
        const subGroups = await subGroupService.query(filterBy)
        res.send(subGroups)
    } catch (err) {
        logger.error('Cannot get subGroups', err)
        res.status(500).send({ err: 'Failed to get subGroups' })
    }
}

async function deleteSubGroup(req, res) {
    try {
        const deletedCount = await subGroupService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove subGroup' })
        }
    } catch (err) {
        logger.error('Failed to delete subGroup', err)
        res.status(500).send({ err: 'Failed to delete subGroup' })
    }
}

async function addSubGroup(req, res) {

    try {
        const subGroup = req.body
        const addedSubGroup = await subGroupService.add(subGroup)
        res.json(addedSubGroup)
    } catch (err) {
        logger.error('Failed to add subGroup', err)
        res.status(500).send({ err: 'Failed to add subGroup' })
    }
}

async function updateSubGroup(req, res) {
    try {
        const subGroup = req.body
        const updatedSubGroup = await subGroupService.update(subGroup)
        res.json(updatedSubGroup)
    } catch (err) {
        logger.error('Failed to update subGroup', err)
        res.status(500).send({ err: 'Failed to update subGroup' })

    }
}

module.exports = {
    getSubGroups,
    deleteSubGroup,
    addSubGroup,
    updateSubGroup
}