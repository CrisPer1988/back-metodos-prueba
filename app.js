const express = require("express")
const cors = require("cors")

const slackRouter = require("./src/router/slack.routes")

const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/methods", slackRouter)


module.exports = app