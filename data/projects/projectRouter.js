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