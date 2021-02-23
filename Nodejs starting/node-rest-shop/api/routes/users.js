const express = require('express');
const router = express.Router();
const UserController = require("../controller/users");
const checkAuth = require("../middleware/check_Auth");

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/delete', checkAuth, UserController.user_delete);

module.exports = router;