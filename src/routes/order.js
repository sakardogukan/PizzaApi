"use strict"
/* ---------------- ORDER ROUTE --------------- */

const router = require('express').Router()
const order = require('../controllers/order')
const permissions = require('../middlewares/permissions')

router.use(permissions.isLogin)

router.route('/')
    .get(order.list)
    .post(order.create)

router.route('/:id')
    .get(order.read)
    .put(order.update)
    .patch(order.update)
    .delete(permissions.isAdmin, order.delete)

module.exports = router