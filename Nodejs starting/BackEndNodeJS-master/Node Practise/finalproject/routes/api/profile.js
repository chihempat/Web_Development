const express = require("express")
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ profile: "profile is Success" })
})

module.exports = router;