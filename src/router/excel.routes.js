const express = require("express")

const excelController = require("../controller/excel.controller")

const router = express.Router()

router.post("/create", excelController.createTable)

router.post("/edit", excelController.editTable)

module.exports = router