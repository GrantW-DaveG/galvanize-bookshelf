'use strict';

const express = require('express');
const repo = require('./src/BooksRepository');

// eslint-disable-next-line new-cap
const router = express.Router();



router.get('/books', (req, res, next)=>{
  repo.query()
    .then();
});

router.get('/books/:id', (req, res, next)=>{
  repo.query()
    .then((resolvedData)=>{
      res.send(resolvedData);
      return;
    })
    .catch((err)=>{
      res.sendStatus(404);
      throw err;
    });
});

router.post('/books', (req, res, next)=>{
  let newEntry = req.body;
  newEntry = repo.add(newEntry);
  if(newEntery){
    res.send(newEntry);
    return;
  }
  else{
    res.sendStatus(404);
  }

});



module.exports = router;


// localhost:8000/token