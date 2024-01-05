const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const itemService = require('./item.service')

async function getItems(req, res) {
    try {
        console.log('here');
        const items = await itemService.query(req.query)
        res.send(items)
    } catch (err) {
        logger.error('Cannot get items', err)
        res.status(500).send({ err: 'Failed to get items' })
    }
}

async function deleteItem(req, res) {
    try {
        const deletedCount = await itemService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove item' })
        }
    } catch (err) {
        logger.error('Failed to delete item', err)
        res.status(500).send({ err: 'Failed to delete item' })
    }
}

async function addItem(req, res) {

    try {
        const item = req.body
        const addedItem = await itemService.add(item)
        res.json(addedItem)
    } catch (err) {
        logger.error('Failed to add item', err)
        res.status(500).send({ err: 'Failed to add item' })
    }
}

async function updateItem(req, res) {
    try {
      const item = req.body
      const updatedItem = await itemService.update(item)
      res.json(updatedItem)
    } catch (err) {
      logger.error('Failed to update item', err)
      res.status(500).send({ err: 'Failed to update item' })
  
    }
  }

module.exports = {
    getItems,
    deleteItem,
    addItem,
    updateItem
}