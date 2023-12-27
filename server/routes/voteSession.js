const express = require("express");
const {
    getVotingSessions,
    getVotingSession,
    createVotingSession,
    closeVotingSession,
    deleteVotingSession,
    updateVotingSession
} = require('../controllers/votingSessionController');

const sessionRoutes = express.Router();

// GET all voting sessions
sessionRoutes.get('/', getVotingSessions)

// GET a single voting session
sessionRoutes.get('/:nanoId', getVotingSession)

// POST a new voting session
sessionRoutes.post('/', createVotingSession)

// Close a voting session
sessionRoutes.post('/close/:id', closeVotingSession)

// DELETE a voting session
sessionRoutes.delete('/:id', deleteVotingSession)

// UPDATE a voting session
sessionRoutes.put('/:id', updateVotingSession)

module.exports = sessionRoutes;