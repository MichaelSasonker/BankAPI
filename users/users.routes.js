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

    let result = usersJSON.users.find(user => user.passportId == passportId);

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
        fs.writeFileSync('./users/users.json', JSON.stringify(tempJSON));
        res.status(201).json({ message: "User has created!" });
    }
})
.put('/depositing', (req, res) => {
    console.log(req.body);
    const { passportId, amount } = req.body;

    let result = usersJSON.users.filter( user => user.passportId == passportId);

    if (!passportId) {
        return res.status(200).json({ error: "Please enter passport id!" });
    }
    else if (result.length === 0) {
        return res.status(200).json({ error: "No such passport id!" });
    }
    else if (isPositiveInt(amount) === false) {
        return res.status(200).json({ error: "This amount of cash is not valid!" });
    }
    else {
        console.log(result);
        if (!result[0].isActive) {
            return res.status(200).json({ error: "This user is NOT active!" });
        }
        else {
            const userObj = {
                passportId,
                cash: result[0].cash + amount,
                credit: result[0].credit,
                isActive: result[0].isActive
            }
    
            let tempJSON = usersJSON;
            let indxRes = tempJSON.users.findIndex((obj) => obj.passportId == passportId);
            // console.log(indxRes);
            tempJSON.users.splice(indxRes, 1);
            tempJSON.users.push(userObj);
            console.log(tempJSON);
            fs.writeFileSync('./users/users.json', JSON.stringify(tempJSON));
            res.status(201).json({ message: "Action performed successfully!" });
        }
    }
})


module.exports = router;