"use strict"
/* ---------------- ORDER CONTROLLER ---------- */

const Order = require('../models/order')
const Pizza = require('../models/pizza')

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.summary = 'List Orders'
            #swagger.description = `
            You can send query with endpoint-browser for search[], sort[], page and limit
            <ul>Examples:
                <li> URL?<b>search[field1]=value1&search[field2]=value2</b> </li>
                <li> URL?<b>sort[field1]=1&sort[field2]=-1</b> </li>
                <li> URL?<b>page=2&limit=2</b> </li>
            </ul>
            `
        */
        const data = await res.getModelList(Order, {}, ['userId', { path: 'pizzaId', populate: 'toppings' }])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            data
        })
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.summary = 'Create a Order'
            #swagger.description = 'You can send parameters in body'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "...userId...",
                    "pizzaId": "...pizzaId...",
                    "size": "Small",
                    "quantitiy": 2
                }
            }  
        */
        // Calculatings:
        req.body.quantity = req.body?.quantity || 1 // default: 1
        if (!req.body?.price) {
            const dataPizza = await Pizza.findOne({ _id: req.body.pizzaId }, { _id: 0, price: 1 })
            req.body.price = dataPizza.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.summary = 'Update a Order'
            #swagger.description = `
            A record containing "OrderID" is called up. Then, the update is made with the values ​​in the "body".
            <ul> Examples:
                <li> URL/<b>orderId</b></li>
            </ul>
            `
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "...userId...",
                    "pizzaId": "...pizzaId...",
                    "size": "Small",
                    "quantitiy": 2
                }
            } 
        */

        //? Calculatings:
        req.body.quantity = req.body?.quantity || 1 // default:1
        if (!req.body?.price) {
            const dataOrder = await Order.findOne({ _id: req.params.id }, { _id: 0, price: 1 })
            // console.log(dataOrder);
            req.body.price = dataOrder.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await Order.findOne({ _id: req.params.id })
        })
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.summary = 'Read a Order'
            #swagger.description = `
            A record containing "OrderID" is called up.
            <ul> Examples:
                <li> URL/<b>orderId</b></li>
            </ul>
            `
        */

        const data = await Order.findOne({ _id: req.params.id }).populate([
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])
        res.status(200).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.summary = 'Delete a Order'
            #swagger.description = `
                <ul> Examples:
                    <li> URL/<b>orderId</b></li>
                </ul>
            `
        */
        
        const data = await Order.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}