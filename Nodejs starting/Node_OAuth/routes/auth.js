const express = require("express")
const passport = require('passport')
const router = express.Router()

//@ type GET
//@route /auth/google
//@desc Auth with google
//@access PUBLIC
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));


//@ type GET
//@route /auth/google/callback
//@desc Google autth callback
//@access PUBLIC
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: ('/') }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)

module.exports = router;