"use strict"
/* ---------------- PERMISSIONS --------------- */

module.exports = {
    isLogin: (req, res, next) => {
        // return next()
        if (req.user) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No permission: You must login.')
        }
    },
    isAdmin: (req, res, next) => {
        // return next()
        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No permission: You must login and to be Admin.')
        }
    }
}