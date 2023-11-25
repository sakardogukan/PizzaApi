"use strict"
/* ---------------- TOPPING ROUTE --------------- */

const router = require('express').Router()
const topping = require('../controllers/topping')
const permissions = require('../middlewares/permissions')

router.use(permissions.isAdmin)

router.route('/')
    .get(topping.list)
    .post(topping.create)

router.route('/:id')
    .get(topping.read)
    .put(topping.update)
    .patch(topping.update)
    .delete(topping.delete)

module.exports = router