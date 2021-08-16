const mongoose = require('mongoose')


const rssFeedsSchema = new mongoose.Schema({
    searchKey: {
        type: String,
        required: true,
        index: true
    },
    result: {
        type: String
    },
    createdAt: {
        type: Date
    }
})

module.exports = mongoose.model('feeds',rssFeedsSchema)