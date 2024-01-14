const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = {
            groupId: { $regex: filterBy.group, $options: 'i' },
        }
        const collection = await dbService.getCollection('subGroup')
        const subGroups = await collection.find(criteria).toArray()
        return subGroups
    } catch (err) {
        logger.error('cannot find subGroups', err)
        throw err
    }

}

async function remove(subGroupId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { loggedinUser } = store
        const collection = await dbService.getCollection('subGroup')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(subGroupId) }
        // if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove subGroup ${subGroupId}`, err)
        throw err
    }
}


async function add(subGroup) {
    try {
        const subGroupToAdd = {
            name: subGroup.name,
            groupId: subGroup.groupId
        }
        const collection = await dbService.getCollection('subGroup')
        await collection.insertOne(subGroupToAdd)
        return subGroupToAdd
    } catch (err) {
        logger.error('cannot insert subGroup', err)
        throw err
    }
}

async function update(subGroup) {
    try {
        const subGroupToSave = {
            name: subGroup.name,
            number: subGroup.number
        }
        const collection = await dbService.getCollection('subGroup')
        await collection.updateOne({ _id: ObjectId(subGroup._id) }, { $set: subGroupToSave })
        return subGroup
    } catch (err) {
        logger.error(`cannot update subGroup ${subGroup._id}`, err)
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


