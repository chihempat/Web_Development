 const express = require("express")
 const router = express.Router()
 const { ensureAuth, ensureGuest } = require('../middleware/auth')

 //@ type GET
 //@route /api/auth
 //@desc Login/Landing page
 //@access PUBLIC
 router.get('/', ensureGuest, (req, res) => {
     //console.log(profile)
     res.render('login', { layout: 'login' })
 })


 //@ type GET
 //@route /api/auth
 //@desc Login/Landing page
 //@access PUBLIC
 router.get('/dashboard', ensureAuth, (req, res) => {
     console.log(req.user)
     res.render('dashboard', {
         name: req.user.firstName,
     })
 })
 module.exports = router;