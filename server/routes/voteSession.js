const express = require("express");
const {
    getVotingSessions,
    getVotingSession,
    createVotingSession,
    deleteVotingSession,
    updateVotingSession
} = require('../controllers/votingSessionController');

const sessionRoutes = express.Router();

// GET all voting sessions
sessionRoutes.get('/', getVotingSessions)

// GET a single voting session
sessionRoutes.get('/:id', getVotingSession)

// POST a new voting session
sessionRoutes.post('/', createVotingSession)

// DELETE a voting session
sessionRoutes.delete('/:id', deleteVotingSession)

// UPDATE a voting session
sessionRoutes.put('/:id', updateVotingSession)

module.exports = sessionRoutes;