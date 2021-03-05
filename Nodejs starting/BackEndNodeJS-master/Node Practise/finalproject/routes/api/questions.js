const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");



//@ type GET
//@route /api/profile
//@desc just for personal user profile
//@access PRIVATE
router.get(
    '/',
    passport.authenticate('jwt', { session: true }),
    (req, res) => {
        res.json({ questions: "questions is Success" });
    });

module.exports = router;