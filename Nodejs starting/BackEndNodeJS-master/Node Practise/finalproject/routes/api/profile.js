const express = require("express")
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");

//load person model
const Person = require("../../model/Person")
    //laod profile model
const Profile = require("../../model/Profile");

//@ type GET
//@route /api/profile
//@desc route for login for a user
//@access PRIVATTE

router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // console.log(user);
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ message: "no profile found" })
                }
                res.json(profile);


            })
            .catch(err => console.log("Got some error:" + err))
    });

//@ type POST
//@route /api/profile/
//@desc route for UPDATING/SAVING userprofile
//@access Peicate

router.post('/', passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req.body.languages);
        const profileValues = {};
        profileValues.user = req.user.id;
        if (req.body.username) profileValues.username = req.body.username;
        if (req.body.website) profileValues.website = req.body.website;
        if (req.body.country) profileValues.country = req.body.country;;
        if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
        if (typeof req.body.languages !== undefined) {
            profileValues.languages = req.body.languages.split(',');
        }
        //get social liinks
        profileValues.social = {};
        if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
        if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
        if (req.body.instagram) profileValues.social.instagram = req.body.instagram;
        console.log(req)
            //do database stuffs

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileValues }, { new: true })
                        .then(profile => res.json(profile)).
                    catch(err => console.log(err))
                } else {
                    Profile.findOne({ username: profileValues.username })
                        .then(profile => {
                            //user already exists
                            if (profile) {
                                res.status(400).json({ username: "Username already exist" })
                            }
                            console.log(profileValues.username);
                            console.log(req.body.username);
                            //saveuser
                            new Profile(profileValues)
                                .save()
                                .then(profile => res.json(profile))
                                .catch(err => console.log("Error is here " + err))
                        })
                        .catch(err => console.log("User not found" + err));
                }
            })
            .catch(err => console.log("problem fetching ueser" + err))


    })

module.exports = router;

//@ type GET
//@route /api/profile
//@desc route for login for a user
//@access Public
router.get('/:username', (req, res) => {
    Profile.findOne({ username: req.params.username })
        .populate("user", ["name", "profilepic"])
        .then(profile => {
            console.log(req.user)
            if (!profile) {
                res.status(404).json({ message: "User not Found" })
            }
            res.json(profile);
        })
        .catch(err => console.log("Errorr in catching username" + err))
});

//@ type GET
//@route /api/profile/find/everyone
//@desc route for findiing everything
//@access Public
router.get("/find/everyone", (req, res) => {
    console.log(Profile);
    Profile.find()
        .populate("user", ["name", "profilepic"])
        .then(profiles => {
            console.log(profiles)
            if (!profiles) {
                res.status(404).json({ message: "NO profile Found" })
            }
            res.json(profiles);
        })
        .catch(err => console.log("Errorr in catching username" + err))
});


//@ type POST
//@route /api/profile/workrole
//@desc route for adding work
//@access private
router.post("/workrole",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newWork = {
                    role: req.body.role,
                    company: req.body.company,
                    country: req.body.country,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    details: req.body.details
                }
                profile.workrole.unshift(newWork);
                profile.save().then(profile => res.json(profile)).catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }
);

//@ type DELETE
//@route /api/profile/workrole
//@desc route for adding work
//@access private
router.delete("/workrole/:w_id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {

                const removethis = profile.workrole.
                map(item => item.id).
                indexOf(req.params.w_id)
                profile.workrole.splice(removethis, 1);
                profile.save().then(profile => res.json(profile)).catch(err => console.log(err))

            })
            .catch(err => console.log(err))
    }
);






//@ type Delete
//@route /api/profile/delete
//@desc route for deleting
//@access private
router.delete("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(Profile);
    Profile.findOne({ user: req.user.id });
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            Person.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: "delete was success" }))
                .catch(err => console.log("errtrtr" + err))
        })
        .catch(err => { console.log("errrrrr" + err); })
});
//.populate("user", ["name", "profilepic"])