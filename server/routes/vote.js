const express = require("express");
const {
    createVote,
    deleteVote,
    updateVote
} = require('../controllers/voteController');

const voteRoutes = express.Router();

// POST a new vote
voteRoutes.post('/:nanoId', createVote)

// DELETE a vote
voteRoutes.delete('/:nanoId', deleteVote)

// UPDATE a vote
voteRoutes.put('/:nanoId', updateVote)

module.exports = voteRoutes;