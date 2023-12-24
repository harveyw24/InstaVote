const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    cookieId: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }]
})

module.exports = VoteSchema;