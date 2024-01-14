const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = {
            subgroupId: { $regex: filterBy.subgroup, $options: 'i' },
        }
        const collection = await dbService.getCollection('item')
        const items = await collection.find(criteria).toArray()
        return items
    } catch (err) {
        logger.error('cannot find items', err)
        throw err
    }

}

async function remove(itemId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { loggedinUser } = store
        const collection = await dbService.getCollection('item')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(itemId) }
        // if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}


async function add(item) {
    try {
        console.log(item);
        const itemToAdd = {
            name: item.name,
            number: item.number
        }
        const collection = await dbService.getCollection('item')
        await collection.insertOne(itemToAdd)
        return itemToAdd
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

async function update(item) {
    try {
        const itemToSave = {
            name: item.name,
            number: item.number
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ _id: ObjectId(item._id) }, { $set: itemToSave })
        return item
    } catch (err) {
        logger.error(`cannot update item ${item._id}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    update
}


