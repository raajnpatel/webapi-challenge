const express = require('express');
const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res
                .status(200)
                .json(action)
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});




function validateActionId(req, res, next) {
    const { id } = req.params;
    Action.get(id)
        .then(action => {
            if(action){
                req.action = action;
                next();
            } else {
                res
                    .status(404)
                    .json({error:"User ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
}

module.exports = router;