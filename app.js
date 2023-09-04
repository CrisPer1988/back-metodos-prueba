const express = require("express")
const cors = require("cors")

const slackRouter = require("./src/router/slack.routes")
const trelloRouter = require("./src/router/trello.routes")
const excelRouter = require("./src/router/excel.routes")

const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/methods", slackRouter)
app.use("/api/trello", trelloRouter)
app.use("/api/excel", excelRouter)


module.exports = app