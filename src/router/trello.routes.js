const express = require("express")

const trelloController = require("../controller/trello.controller")

const router = express.Router()

router.post("/add-member", trelloController.addMembersToBoard)



module.exports = router