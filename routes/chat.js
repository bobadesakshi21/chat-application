const express = require('express')
const router = express.Router()

const chatController = require('../controllers/chat')

router.get('/', chatController.chat)

module.exports = router
