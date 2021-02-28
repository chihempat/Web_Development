const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport')
    //login Page
router.get('/login', (req, res) => {
    console.trace();
    res.render("login")
})

//Register Pages
router.get('/register', (req, res) => {
    res.render("register");
})

//user model

//register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body; //destructers

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please enter the details" });
    }

    if (password != password2) {
        errors.push({ msg: "Password did not match" });
    }

    //checek pass length
    if (password.lenght < 6) {
        errors.push({ msg: 'password should be at altlest 6 charaters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //Validattion pass
        User.findOne({ email: email }).then(user => {
            if (user) {
                //user exists
                errors.push({ msg: "Email is already in use" })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                console.log("hello world")
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //hash password

                bcrypt.genSalt(10, (error, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hash
                        newUser.password = hash;

                        newUser.save().then(user => {
                            res.flash("success_msg", 'You are now registered and can login');
                            res.redirect('/users/login');
                        }).catch((err) => { console.log(err) });
                    }))
            }
        })
    }

})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//loout handler

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success-msg', 'you are looged out')
    res.redirect('/users/login');
})

module.exports = router;