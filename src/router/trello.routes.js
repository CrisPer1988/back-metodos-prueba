const express = require("express")

const trelloController = require("../controller/trello.controller")

const router = express.Router()

router.post("/create-board", trelloController.createBoard)

router.post("/add-member", trelloController.addMembersToBoard)

router.get("/workspaceId", trelloController.getWorkspaceId)

module.exports = router