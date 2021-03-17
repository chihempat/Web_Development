 const express = require("express")
 const router = express.Router()
 const { ensureAuth, ensureGuest } = require('../middleware/auth')

 const Story = require('../models/Story')

 //@ type GET
 //@route /api/auth
 //@desc Login/Landing page
 //@access PUBLIC
 router.get('/', ensureGuest, (req, res) => {
     //console.log(profile)
     res.render('login', { layout: 'login' })
 })


 //@ type GET
 //@route GET /dashboard
 //@desc Dashboard
 //@access PUBLIC

 router.get('/dashboard', ensureAuth, async(req, res) => {
     console.log("in dashboard route=>>3     ")
     try {
         const stories = await Story.find({ user: req.user.id }).lean()
         res.render('dashboard', {
             name: req.user.firstName,
             stories
         })
     } catch (err) {
         console.error(err);
         res.render('error/500')
     }
 })
 module.exports = router;