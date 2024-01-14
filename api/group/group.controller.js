const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const groupService = require('./group.service')

async function getGroups(req, res) {
    try {
        const groups = await groupService.query()
        res.send(groups)
    } catch (err) {
        logger.error('Cannot get groups', err)
        res.status(500).send({ err: 'Failed to get groups' })
    }
}

async function deleteGroup(req, res) {
    try {
        const deletedCount = await groupService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove group' })
        }
    } catch (err) {
        logger.error('Failed to delete group', err)
        res.status(500).send({ err: 'Failed to delete group' })
    }
}

async function addGroup(req, res) {

    try {
        const group = req.body
        const addedGroup = await groupService.add(group)
        res.json(addedGroup)
    } catch (err) {
        logger.error('Failed to add group', err)
        res.status(500).send({ err: 'Failed to add group' })
    }
}

async function updateGroup(req, res) {
    try {
        const group = req.body
        const updatedGroup = await groupService.update(group)
        res.json(updatedGroup)
    } catch (err) {
        logger.error('Failed to update group', err)
        res.status(500).send({ err: 'Failed to update group' })

    }
}

module.exports = {
    getGroups,
    deleteGroup,
    addGroup,
    updateGroup
}