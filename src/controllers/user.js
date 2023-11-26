"use strict"
/* ---------------- USER CONTROLLER ---------- */

const User = require('../models/user')
// require('../middlewares/findSearchSortPage')

module.exports = {
    list: async (req, res) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = 'List Users'
        #swagger.description = `
        You can send query with endpoint-browser for search[], sort[], page and limit
        <ul>Examples:
            <li> URL?<b>search[field1]=value1&search[field2]=value2</b> </li>
            <li> URL?<b>sort[field1]=1&sort[field2]=-1</b> </li>
            <li> URL?<b>page=2&limit=2</b> </li>
        </ul>
        `
    */
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })

    },
    create: async (req, res) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Create a User'
        #swagger.description = 'You can send parameters in body'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "username": "test-X",
                "password": "1234",
                "email": "test@test.com",
            }
        }  
    */
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Update a User'
        #swagger.description = `
        A record containing "UserID" is called up. Then, the update is made with the values ​​in the "body".
        <ul> Examples:
            <li> URL/<b>userId</b></li>
        </ul>
        `
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "username": "test-X",
                "password": "1234",
                "email": "test@test.com",
            }
        }  
    */
        const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })

    },
    read: async (req, res) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Read a User'
        #swagger.description = `
        A record containing "UserID" is called up.
        <ul> Examples:
            <li> URL/<b>userId</b></li>
        </ul>
        `
    */
        const data = await User.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {
     /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Delete a User'
        #swagger.description = `
            <ul> Examples:
                <li> URL/<b>userId</b></li>
            </ul>
        `
    */
        const data = await User.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}