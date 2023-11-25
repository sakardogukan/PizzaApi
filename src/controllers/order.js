"use strict"
/* ---------------- ORDER CONTROLLER ---------- */

const Order = require('../models/order')
const Pizza = require('../models/pizza')

module.exports = {
    list: async (req, res) => {

        const data = await res.getModelList(Order, {}, ['userId', { path: 'pizzaId', populate: 'toppings' }])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            data
        })
    },
    create: async (req, res) => {

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
        const data = await Order.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}