const express = require("express");
const {
    createVote,
    deleteVote,
    updateVote,
    checkVoter
} = require('../controllers/voteController');

const voteRoutes = express.Router();

// POST a new vote
voteRoutes.post('/:nanoId', createVote)

// DELETE a vote
voteRoutes.delete('/:nanoId', deleteVote)

// UPDATE a vote
voteRoutes.put('/:nanoId', updateVote)

// Check if user has voted
voteRoutes.get('/:nanoId/:cookieId', checkVoter)

module.exports = voteRoutes;