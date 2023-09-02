const express = require("express")

const trelloController = require("../controller/trello.controller")

const router = express.Router()

router.post("/create-board", trelloController.createBoard)

// router.post("/add-member", trelloController.addMembersToBoard)

router.post("/create-list", trelloController.createList)

router.post("/create-card", trelloController.createCard)

router.post("/add-member-trello", trelloController.addUserBoard)

// router.get("/idid", trelloController.getWorkspaceId)

// router.get("/boardId", trelloController.getBoardId)

// router.get("/listId", trelloController.getListId)


module.exports = router