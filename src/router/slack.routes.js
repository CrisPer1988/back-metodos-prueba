const express = require("express")

const slackController = require("../controller/slack.controller")


const router = express.Router()

router.post("/send-message", slackController.sendMessage)

router.post('/create', slackController.createChannel)

module.exports = router