const express = require('express');
const actionRouter = require('./data/actions/actionRouter');
const projectRouter = require('./data/projects/projectRouter');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

const port = process.env.PORT || 4444;

server.get('/', (req, res) => {
  res.send(`<h2>API running on port ${port}</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

server.use(logger);

module.exports = server;
