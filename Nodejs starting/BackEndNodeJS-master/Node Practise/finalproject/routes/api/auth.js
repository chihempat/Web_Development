const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");


//@ type GET
//@route /api/auth
//@desc just for testing
//@access PUBLIC
router.get('/', (req, res) => {
    res.json({ test: "Auth is Begin tested" })
})

//import person schema from
const Person = require("../../model/Person")

//@ type POST
//@route /api/auth/register
//@desc route for registering a user
//@access PUBLIC
router.post('/register', (req, res) => {
    console.log(Person)
    Person.findOne({ email: req.body.email })
        .then(person => {
            if (person) {
                return res.status(400).json({ emailerror: "Email is already resgitered in our system" })
            } else {
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPerson.password = hash;
                        newPerson.save()
                            .then(person => res.json(person))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
        .catch(err => { console.log(err) })
});

//@ type POST
//@route /api/auth/login
//@desc route for login for a user
//@access PUBLIC

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(Person)
    Person.findOne({ email: email })
        .then(person => {
            if (!person) {
                return res.status(404).json({ emailerror: 'User not found with this email' })
            }
            bcrypt.compare(password, person.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        //res.json({ success: "User is able to login succesfully" });
                        const payload = {
                            id: person.id,
                            name: person.name,
                            email: person.email,
                        };
                        jsonwt.sign(
                            payload,
                            key.secret, { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            })
                    } else {
                        res.status(400).json({ passworderror: "Password is not corrent" })
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
})


//@ type GET
//@route /api/auth/profile
//@desc route for user profile
//@access PRIVATE

router.get('/profile', passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // console.log(req);
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            profilepic: req.user.profilepic
        });
    });



module.exports = router;