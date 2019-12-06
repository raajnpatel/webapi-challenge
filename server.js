const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);


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
