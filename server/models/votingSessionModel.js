const mongoose = require('mongoose');
const VoteSchema = require('./voteModel');

const VotingSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    votes: [VoteSchema]
}, { timestamps : true });

module.exports = mongoose.model('VotingSession', VotingSessionSchema);