"use strict"
/* ---------------- INDEX.JS ----------------- */
//! Required Moduls:
const express = require('express')
const app = express()

require('dotenv').config({ path: __dirname + '/.env' })
// require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
// console.log(process.env.PORT);
// console.log(process.env.ACCESS_KEY);

//? asyncErrors to errorHandler:
require('express-async-errors')

//? Cors Confg:
var cors = require('cors')
app.use(cors())
/* ------------------------------------------- */
//! Configuration:
//? Connect to DB:
const { dbConnection } = require('./src/config/dbConnection')
dbConnection()
/* ------------------------------------------- */
//! Middlewares:

//? Accept to JSON:
app.use(express.json())

//? accessToken Control:
app.use(require('./src/middlewares/authentication'))

//? Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))

//? Run Logger:
app.use(require('./src/middlewares/logger'))

//! Documentation:
// Swagger:
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
// JSON:
app.use('/docs/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})
// Redoc:
const redoc = require('redoc-express')
app.use('/docs/redoc', redoc({
    specUrl: '/docs/json',
    title: 'API Docs',
}))

/* ------------------------------------------- */
//! Routes:

//? Home Page:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Pizza API',
        api: {
            doument: {
                json: '/docs/json',
                swagger: '/docs/swagger',
                redoc: '/docs/redoc'
            },
            contact: 'DGKN'
        },
        isLogin: req.isLogin,
        user: req.user
    })
    console.log(req.user);
})

//? Auth:
app.use('/auth', require('./src/routes/auth'))

//? User:
app.use('/users', require('./src/routes/user'))

//? Topping:
app.use('/toppings', require('./src/routes/topping'))

//? Pizza:
app.use('/pizzas', require('./src/routes/pizza'))

//? Order:
app.use('/orders', require('./src/routes/order'))
/* ------------------------------------------- */

/* ------------------------------------------- */
//? asyncErrors to errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//? PORT Listen:
app.listen(PORT, () => console.log(`Running: http://${HOST}:${PORT}`))

//! Synchronization (must be in commentLine):
// require('./src/helpers/sync')()