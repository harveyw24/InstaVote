const Vote = require('../models/voteModel');
const VotingSession = require('../models/votingSessionModel');
const mongoose = require('mongoose');

// POST a new vote
const createVote = async (req, res) => {
    const { id } = req.params;
    const { cookieId, options } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }

    try {
        const votingSession = await VotingSession.findById(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        // Check if all options are valid
        for (let option of options) {
            if (!votingSession.options.includes(option)) {
                return res.status(400).json({error: 'Invalid option'});
            }
        }

        let vote = votingSession.votes.find(vote => vote.cookieId === cookieId);

        if (vote) {
            vote.options = [...options];
        } else {
            vote = { cookieId, options };
            votingSession.votes.push(vote);
        }

        await votingSession.save();

        res.status(200).json(votingSession);


    } catch (error) {
        return res.status(400).json({error: 'Error creating vote'});
    }
}

// Delete a vote
const deleteVote = async (req, res) => {
    const { id } = req.params;
    const { cookieId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }

    try {
        const votingSession = await VotingSession.findById(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        const vote = votingSession.votes.find(vote => vote.cookieId === cookieId);

        if (!vote) {
            return res.status(404).json({error: 'Vote not found'});
        }

        votingSession.votes.pull(vote);
        await votingSession.save();

        res.status(200).json(votingSession);

    } catch (error) {
        return res.status(400).json({error: 'Error deleting vote'});
    }
}

// Update a vote
const updateVote = async (req, res) => {
    const { id } = req.params;
    const { cookieId, options } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }

    try {
        const votingSession = await VotingSession.findById(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        let vote = votingSession.votes.find(vote => vote.cookieId === cookieId);

        if (!vote) {
            return res.status(404).json({error: 'Vote not found'});
        }

        vote.options = [...options];
        await votingSession.save();

        res.status(200).json(votingSession);

    } catch (error) {
        return res.status(400).json({error: 'Error updating vote'});
    }
}

module.exports = {
    createVote,
    deleteVote,
    updateVote
}
