const mongoose = require('mongoose');
const VoteSchema = require('./voteModel');

mongoose.set('debug', true);
console.log(new Date().toUTCString() + ' - ' + 'votingSessionModel.js - mongoose.set(\'debug\', true);');

const VotingSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    votes: [VoteSchema],
    closed: {
        type: Boolean,
        default: false
    }
}, { timestamps : true });

module.exports = mongoose.model('VotingSession', VotingSessionSchema);