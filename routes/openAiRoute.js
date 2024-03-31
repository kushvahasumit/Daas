const express = require('express');
const {generateImg }= require('../controllers/openAiController')
const router = express.Router();


router.post('/genImg',generateImg)

module.exports = router;