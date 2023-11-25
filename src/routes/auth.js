"use strict"
/* ------------ AUTHORIZATION ROUTE ------------ */
const router = require('express').Router()
const auth = require('../controllers/auth')

router.post('/login', auth.login)
router.post('/refresh', auth.refresh)
router.get('/logout', auth.logout) // bu metotta "all" metodu kullanılmadı. Çünkü "all"'da swagger yakalayamıyordu.

module.exports = router