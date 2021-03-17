const express = require("express")
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//@ type GET
//@route /stories/add
//@desc Show add page
//@access PRIVATE
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

//@ type POST
//@route /stories
//@desc PROCEESS ADD STORIRES
//@access PRIVATE
router.post('/', ensureAuth, async(req, res) => {
    try {
        console.log('body')
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@ type POST
//@route /
//@desc To get all the stories
//@access PRIVATE
router.get('/', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ status: "public" }).populate('user').sort({ createdAt: "desc" }).lean()
        res.render('stories/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@ type Get
//@route /edit/id
//@desc To ediit
//@access PRIVATE
router.get('/edit/:id', ensureAuth, async(req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean()
        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {
                story,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }

})

router.put('/:id', ensureAuth, async(req, res) => {
    try {
        let story = await Story.findById(req.params.id)
        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})
module.exports = router;