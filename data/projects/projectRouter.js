const express = require('express');
const Project = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res
                .status(200)
                .json(project)
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            res
                .status(200)
                .json(project)
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
    Project.insert(text)
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

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const text = req.body;
    Project.update(id, text)
        .then(updated => {
            if(updated){
                console.log(updated);
                Project.get(id)
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
    Project.remove(id)
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

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            if(project){
                req.project = project;
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