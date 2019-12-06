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

router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Action.get(id)
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

router.post('/', (req, res) => {
    const text = req.body;
    Action.insert(text)
        .then(text => {
            console.log(text);
            res
                .status(201)
                .json(text)
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});

router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const text = req.body;
    Action.update(id, text)
        .then(updated => {
            if(updated){
                console.log(updated);
                Action.get(id)
                    .then(newText => {
                        console.log(newText);
                        if(newText){
                            res
                                .status(201)
                                .json(newText)
                        } else {
                            res
                                .status(404)
                                .json({error:"Error making changes."})
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res
                            .status(500)
                            .json({error:"Error reaching server."})
                    })
            }
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Action.remove(id)
        .then(removed => {
            if(removed) {
                res
                    .status(204)
                    .json({message: "The entry has been deleted."})
            } else {
                res
                    .status(404)
                    .json({error:"That entry ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was an error reaching the server."})
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