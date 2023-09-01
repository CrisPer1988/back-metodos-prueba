const express = require("express")

const slackController = require("../controller/slack.controller")


const router = express.Router()

router.post("/send-message", slackController.sendMessage)

router.post('/create', slackController.createChannel)

router.post('/add-member-to-channel', slackController.addMemberToChannel)

router.get("/list-channel", slackController.listChannel)

router.get("/myId", slackController.getUserId)

module.exports = router