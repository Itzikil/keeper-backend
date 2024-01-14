const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query() {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('group')
        const groups = await collection.find().toArray()
        return groups
    } catch (err) {
        logger.error('cannot find groups', err)
        throw err
    }

}

async function remove(groupId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { loggedinUser } = store
        const collection = await dbService.getCollection('group')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(groupId) }
        // if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove group ${groupId}`, err)
        throw err
    }
}


async function add(group) {
    try {
        console.log(group);
        const groupToAdd = {
            name: group.name,
            number: group.number
        }
        const collection = await dbService.getCollection('group')
        await collection.insertOne(groupToAdd)
        return groupToAdd
    } catch (err) {
        logger.error('cannot insert group', err)
        throw err
    }
}

async function update(group) {
    try {
        const groupToSave = {
            name: group.name,
            number: group.number
        }
        const collection = await dbService.getCollection('group')
        await collection.updateOne({ _id: ObjectId(group._id) }, { $set: groupToSave })
        return group
    } catch (err) {
        logger.error(`cannot update group ${group._id}`, err)
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


