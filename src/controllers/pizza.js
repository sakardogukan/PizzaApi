"use strict"
/* ---------------- PIZZA CONTROLLER ---------- */

const Pizza = require('../models/pizza')

module.exports = {
    list: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'List Pizzas'
        #swagger.description = `
        You can send query with endpoint-browser for search[], sort[], page and limit
        <ul>Examples:
            <li> URL?<b>search[field1]=value1&search[field2]=value2</b> </li>
            <li> URL?<b>sort[field1]=1&sort[field2]=-1</b> </li>
            <li> URL?<b>page=2&limit=2</b> </li>
        </ul>
        `
    */
        const data = await res.getModelList(Pizza, {}, 'toppings')

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data
        })

    },
    create: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'Create a Pizza'
        #swagger.description = 'You can send parameters in body'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "name": "mixed pizza",
                "price": 10,
                "toppings": [
                    "...toppingId-1...",
                    "...toppingId-2..."
                ]
            }
        }  
    */
        const data = await Pizza.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'Update a Pizza'
        #swagger.description = `
        A record containing "PizzaID" is called up. Then, the update is made with the values ​​in the "body".
        <ul> Examples:
            <li> URL/<b>pizzaId</b></li>
        </ul>
        `
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "name": "sossis",
                "price": 100,
                "toppings": [
                    "...toppingId-1...",
                    "...toppingId-2..."
                ]
            }
        }  
    */
        const data = await Pizza.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await Pizza.findOne({ _id: req.params.id })
        })

    },
    read: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'Read a Pizza'
        #swagger.description = `
        A record containing "pizzaID" is called up.
        <ul> Examples:
            <li> URL/<b>pizzaId</b></li>
        </ul>
        `
    */
        const data = await Pizza.findOne({ _id: req.params.id }).populate('toppings')
        res.status(200).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'Delete a Pizza'
        #swagger.description = `
            <ul> Examples:
                <li> URL/<b>pizzaId</b></li>
            </ul>
        `
    */
        const data = await Pizza.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
    // Add Toppings to pizza.toppings:
    pushToppings: async (req, res) => {
    /*
        #swagger.tags = ['Pizzas']
        #swagger.summary = 'Toppings Add'
        #swagger.description = `
        In order to add sauce by calling the pizza record named "pizzaID", "toppingId" must be entered in the "req.body" field. With Put Method.
        <ul> Examples:
            <li> URL/<b>pizzaId</b>/<b>pushToppings</b></li>
        </ul>
        `
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "toppings": "...toppingId..."
            }
        }  
    */

        const toppings = req.body?.toppings // ObjectId or [ObjectIds]

        //? First long Road:
        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.toppings.push(toppings)
        // await data.save()

        //? Second short Road:
        const data = await Pizza.updateOne({ _id: req.params.id }, { $push: { toppings: toppings } })
        const newData = await Pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(202).send({
            error: false,
            data,
            toppingsCount: newData.toppings.length,
            new: newData
        })

    },
    // Remove Toppings to pizza.toppings:
    pullToppings: async (req, res) => {
        /*
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'Toppings Remove'
            #swagger.description = `
            In order to remove sauce by calling the pizza record named "pizzaID", "toppingId" must be entered in the "req.body" field. With Put Method.
            <ul> Examples:
                <li> URL/<b>pizzaId</b>/<b>pullToppings</b></li>
            </ul>
            `
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "toppings": "...toppingId..."
                }
            }  
        */

        const toppings = req.body?.toppings // ObjectId

        //? First long Road:
        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.toppings.pull(toppings)
        // await data.save()

        //? Second short Road:
        const data = await Pizza.updateOne({ _id: req.params.id }, { $pull: { toppings: toppings } })
        const newData = await Pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(202).send({
            error: false,
            data,
            toppingsCount: newData.toppings.length,
            new: newData
        })
    },
}