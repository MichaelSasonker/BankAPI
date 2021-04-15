const express = require('express');
const router = express.Router();
const fs = require('fs');
const isPositiveInt = require('../utils/is_positive_int_function');

const usersJSON = require('./users.json');

router.get('/', (req,res) => res.status(200).json({ users: usersJSON.users }))
.get('/:passportId', (req, res) => res.status(200).json({ user: usersJSON.users.filter((user) => user.passportId == req.params.passportId) }))
.post('/add', (req, res) => {
    console.log(req.body);
    const { passportId } = req.body;

    let result = usersJSON.users.find( user => user.passportId == passportId);

    if (!passportId) {
        return res.status(200).json({ error: "Please enter passport id!" });
    }
    else if (result) {
        return res.status(200).json({ error: "This passport id is already exist!" });
    }
    else if (isPositiveInt(passportId) === false) {
        return res.status(200).json({ error: "This passport id is not valid!" });
    }
    else {
        const userObj = {
            passportId,
            cash: 0,
            credit: 0,
            isActive: true
        }

        let tempJSON = usersJSON;
        tempJSON.users.push(userObj);
        console.log(tempJSON);
        fs.writeFileSync('./users/users.json', JSON.stringify(tempJSON));
        res.status(201).json({ message: "User has created!" });
    }
})


module.exports = router;