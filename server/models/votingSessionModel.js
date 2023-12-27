const mongoose = require('mongoose');
const VoteSchema = require('./voteModel');

let nanoid;
import('nanoid').then((nano) => {
  nanoid = nano.nanoid;
});

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
    },
    nanoId: {
        type: String,
        default: () => nanoid(4),
        unique: true
    }
}, { timestamps : true });

module.exports = mongoose.model('VotingSession', VotingSessionSchema);