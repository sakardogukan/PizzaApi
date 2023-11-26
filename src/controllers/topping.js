"use strict"
/* ---------------- TOPPING CONTROLLER ---------- */

const Topping = require('../models/topping')

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Toppings']
            #swagger.summary = 'List Toppings'
            #swagger.description = `
            You can send query with endpoint-browser for search[], sort[], page and limit
            <ul>Examples:
                <li>URL?<b>search[filed1]=value1&search[field2]=value2</b></li>
                <li> URL?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li> URL?<b>page=2&limit=1</b></li>
            </ul>
            `
        */
        const data = await res.getModelList(Topping)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Topping),
            data
        })
    },
    create: async (req, res) => {
    /*
        #swagger.tags = ['Toppings']
        #swagger.summary = 'Create a Topping'
        #swagger.description = 'You can send parameters in body'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "name": "sossis"
            }
        }  
    */
        const data = await Topping.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Toppings']
            #swagger.summary = 'Update a Topping'
            #swagger.description = `
                <ul> Examples:
                    <li> URL/<b>toppingId</b></li>
                </ul>
            `
            #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "name": "sossis"
            }
        }
        */
        const data = await Topping.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await Topping.findOne({ _id: req.params.id })
        })

    },
    read: async (req, res) => {
    /*
        #swagger.tags = ['Toppings']
        #swagger.summary = 'Read a Topping'
        #swagger.description = `
        A record containing "toppingD" is called up.
        <ul> Examples:
            <li> URL/<b>toppingId</b></li>
        </ul>
        `
    */
        const data = await Topping.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {
    /*
        #swagger.tags = ['Toppings']
        #swagger.summary = 'Delete a Topping'
        #swagger.description = `
            <ul> Examples:
                <li> URL/<b>toppingId</b></li>
            </ul>
        `
    */
        const data = await Topping.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}