const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/logincontroller');


router.post('/', loginController);

module.exports = router;
