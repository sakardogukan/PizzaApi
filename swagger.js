"use strict"
/* ---------------- SWAGGER.JS --------------- */

require('dotenv').config()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 8000

const swagger = require('swagger-autogen')()
const swaggerAutogen = require('swagger-autogen')
const packageJson = require('./package.json')

const document = {
    info: {
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        termsOfService: 'http://localhost',
        contact: { name: packageJson.author, email: packageJson.email },
        license: { name: packageJson.license }
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https',],
    //! JWT Settings:
    securityDefinition: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            decription: 'Entry your AccessToken (JWT) for Login. Example; <b>Bearer <i>...accessToken...<i></b>'
        }
    },
    security: [{ 'JWT': true }],

    //! Swagger Model Area:
    /*definition: {
        'auth/login': {
            username: {
                type: 'String',
                required: true
            },
            password: {
                type: 'String',
                required: true
            }
        },
        'auth/refresh': {
            'tokenRefresh': {
                desription: 'token: {refresh: ... }',
                type: 'String',
                required: true
            }
        }
    }
*/

}

const routes = ['./index.js']
const outputFile = './swagger.json'
swaggerAutogen(outputFile, routes, document)