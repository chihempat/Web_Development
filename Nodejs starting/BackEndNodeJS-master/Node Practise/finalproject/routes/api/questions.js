const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require('body-parser');

const app = express;


//load questions
const Question = require("../../model/Question");

//load person model
const Person = require("../../model/Person");

//laod profile model
const Profile = require("../../model/Profile");

//@ type Get
//@route /api/questions/
//@desc just for showing all questions
//@access Public
router.get(
    '/',
    (req, res) => {
        Question.find()
            .sort({ date: "desc" })
            .then(question => { res.json(question) })
            .catch(err => res.json({ message: "There is an error" + err }));
    });

//@ type POST
//@route /api/questions
//@desc route for questiin posting
//@access PRIVATE
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const newQuestion = new Question({
            textone: req.body.textone,
            texttwo: req.body.texttwo,
            user: req.user.id,
            name: req.body.name
        });
        newQuestion
            .save()
            .then(question => res.json(question))
            .catch(err => console.log("Unable to push question to database " + err));
    }
);

//@ type    POST
//@route    /api/questions/answers/:id
//@desc     route for submiting answers to answers
//@access   PRIVATE
router.post(
    "/answers/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Question.findById(req.params.id)
            .then(question => {
                const newAnswer = {
                    user: req.user.id,
                    name: req.body.name,
                    text: req.body.text
                };
                question.answers.unshift(newAnswer);
                question.save().then(question => {
                    res.json(question);
                }).catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }
);

//@ type    POST
//@route    /api/questions/upvote/:id
//@desc     route for upvoting
//@access   PRIVATE

router.post('/upvotes/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req.user);
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Question.findById(req.params.id)
                    .then(question => {
                        if (question.upvotes.filter(
                                upvote => upvote.user.toString() === req.user.id.toString()).length > 0) {
                            const i = question.upvotes.indexOf(req.user.id)
                            question.upvotes.splice(i, 1)
                            question.save().then(question => res.json(question)).catch(err => console.log(err))
                        } else {
                            question.upvotes.unshift({ user: req.user.id })
                            question.save()
                                .then(question => {
                                    res.json(question)
                                    res.json({ user: req.user.name })
                                })
                                .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.error(err));

            })
            .catch(err => console.log(err));
    }
);

//@ type    Delete
//@route    /api/questions/:id
//@desc     route for a particular quesstions
//@access   PRIVATE

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.findByIdAndRemove({ _id: req.params.id }).then(question => {
        Question.find().then(q => console.log(`Now the total length is ${q.length}`));
        res.json(question);
    }).catch(err => console.log("Questioin posted by user is not available" + err));
});




//@ type    Delete
//@route    /api/questions/
//@desc     route for deleting questtions
//@access   PRIVATE
router.delete("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.find({ user: req.user.id }).then(question => {
        if (question) {
            Question.deleteMany({ user: req.user.id })
                .then(question => { res.json(question) })
                .catch(error => { console.log(error) })
        } else {
            res.status(404).json({ message: "Not found" })
        }
    }).catch(err => console.log("Questiioin posted by user is not available" + err));
});



module.exports = router;



//assignment - remove upvotiing
//Delete question
//delete all question post by a user
//create a separate route for linux question