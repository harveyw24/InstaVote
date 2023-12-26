const VotingSession = require("../models/votingSessionModel");
const mongoose = require('mongoose');

// GET all voting sessions
const getVotingSessions = async (req, res) => {
    try {
        const votingSessions = await VotingSession.find({}).sort({createdAt: -1});
        res.status(200).json(votingSessions);
    } catch (error) {
        res.status(400).json({error: 'Error getting voting sessions'});
    }
}

// GET a single voting session
const getVotingSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }

    try {
        const votingSession = await VotingSession.findById(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        res.status(200).json(votingSession);

    } catch (error) {
        res.status(400).json({error: 'Error getting voting session'});
    }
}

// POST a new voting session
const createVotingSession = async (req, res) => {
    const {title, options} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!options || options.length === 0) {
        emptyFields.push('options');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Missing required fields', emptyFields});
    }

    try {
        const votingSession = await VotingSession.create({
            title,
            options
        });
        res.status(200).json(votingSession);
    } catch (error) {
        res.status(400).json({error: 'Error creating voting session'});
    }
}

// Close a voting session
const closeVotingSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }

    try {
        const votingSession = await VotingSession.findById(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        votingSession.closed = true;
        await votingSession.save();

        res.status(200).json(votingSession);

    } catch (error) {
        res.status(400).json({error: 'Error closing voting session'});
    }
}

// DELETE a voting session
const deleteVotingSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }
    
    try {
        const votingSession = await VotingSession.findByIdAndDelete(id);

        if (!votingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        res.status(200).json(votingSession);
    } catch (error) {
        res.status(400).json({error: 'Error deleting voting session'});
    }
}

// UPDATE a voting session
const updateVotingSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Voting session not found'});
    }
    
    try {
        const updatedVotingSession = await VotingSession.findByIdAndUpdate(id, {...req.body});

        if (!updatedVotingSession) {
            return res.status(404).json({error: 'Voting session not found'});
        }

        res.status(200).json(updatedVotingSession);
    } catch (error) {
        res.status(400).json({error: 'Error updating voting session'});
    }
}

module.exports = {
    getVotingSessions,
    getVotingSession,
    createVotingSession,
    closeVotingSession,
    deleteVotingSession,
    updateVotingSession
}