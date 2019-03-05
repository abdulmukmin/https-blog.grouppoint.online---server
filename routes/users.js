const express = require('express'),
      router = express.Router(),
      UserController = require('../controllers/user_controller.js');

/* GET users listing. */
router.post('/login', UserController.signIn);
router.post('/register', UserController.register);
router.post('/follow', UserController.followUser);

module.exports = router;
