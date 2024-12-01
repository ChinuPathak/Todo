const mongoose = require('mongoose')

const { Schema } = mongoose

const HistorySchema = new Schema({
    data: {
        type: Array
    }
})

module.exports = mongoose.model('history', HistorySchema)