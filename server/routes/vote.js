const express = require("express");
const {
    createVote,
    deleteVote,
    updateVote
} = require('../controllers/voteController');

const voteRoutes = express.Router();

// POST a new vote
voteRoutes.post('/:id', createVote)

// DELETE a vote
voteRoutes.delete('/:id', deleteVote)

// UPDATE a vote
voteRoutes.put('/:id', updateVote)

module.exports = voteRoutes;