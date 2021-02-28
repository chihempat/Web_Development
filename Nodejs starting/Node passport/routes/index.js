const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')
    //login Page
console.trace()

router.get('/', (req, res) => {
    console.trace();
    res.render('welcome');
});
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = router;

//Register Pages