"use strict"
/* ---------------- PIZZA CONTROLLER ---------- */

const Pizza = require('../models/pizza')

module.exports = {
    list: async (req, res) => {

        const data = await res.getModelList(Pizza, {}, 'toppings')

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data
        })

    },
    create: async (req, res) => {
        const data = await Pizza.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        const data = await Pizza.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await Pizza.findOne({ _id: req.params.id })
        })

    },
    read: async (req, res) => {
        const data = await Pizza.findOne({ _id: req.params.id }).populate('toppings')
        res.status(200).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {
        const data = await Pizza.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
    // Add Toppings to pizza.toppings:
    pushToppings: async (req, res) => {

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