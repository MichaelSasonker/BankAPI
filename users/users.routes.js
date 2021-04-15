const express = require('express');
const router = express.Router();
const fs = require('fs');

const usersJSON = require('./users.json');

router.get('/', (req,res) => res.status(200).json({ users: usersJSON.users }))
.get('/:passportId', (req, res) => res.status(200).json({ user: usersJSON.users.filter((user) => user.passportId == req.params.passportId) }))


module.exports = router;