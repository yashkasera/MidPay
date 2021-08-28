const express = require('express')

const app = express()
app.use(express.json())

console.log("hello")
module.exports = app
