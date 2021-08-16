const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/rssFeeds'

const app = express()

mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const rssFeedRouter = require('./routes/rssFeedsController.js')
app.use('/rssFeeds',rssFeedRouter)

app.listen(9000, () => {
    console.log('Server started at port: 9000')
})