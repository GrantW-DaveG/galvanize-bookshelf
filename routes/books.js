'use strict';

const express = require('express');
const Repo = require('../src/books-repository');

// eslint-disable-next-line new-cap
const router = express.Router();



router.get('/', (req, res, next)=>{
  let repo = new Repo('');
  repo.query()
    .then((resolvedBooks) => {

      if(resolvedBooks){
        res.send(resolvedBooks);
      }
      else{
        res.status(404).send('Not Found');
      }

    });
});

router.get('/:id', (req, res, next)=>{
  let repo = new Repo('');
  repo.query(req.params.id)
    .then((resolvedData)=>{
      res.send(resolvedData);
      return;
    })
    .catch((err)=>{
      res.sendStatus(404);
      throw err;
    });
});

router.post('/', (req, res, next)=>{
  let newEntry = req.body;
  let repo = new Repo('');

  //input validation before add call
  if(!newEntry.title){
    res.status(404).send('Title must not be blank');
  }


  let response = repo.add(newEntry);
  response.then((responseEntry) => {

    res.send(responseEntry);
    return;

  })
  .catch((err) => {
    return err;
  });



});



module.exports = router;


// localhost:8000/token