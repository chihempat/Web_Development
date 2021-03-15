 const express = require("express")
 const router = express.Router()

 //@ type GET
 //@route /api/auth
 //@desc Login/Landing page
 //@access PUBLIC
 router.get('/', (req, res) => {
     res.render('login', { layout: 'login' })
 })


 //@ type GET
 //@route /api/auth
 //@desc Login/Landing page
 //@access PUBLIC
 router.get('/dashboard', (req, res) => {
     res.render('dashboard')
 })
 module.exports = router;