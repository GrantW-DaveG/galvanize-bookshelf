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
  let repo = new Repo();

  //input validation before add call
  if(!newEntry.title){
    res.status(400).send('Title must not be blank');
  }
  else if(!newEntry.author){
    res.status(400).send('Author must not be blank');
  }
  else if(!newEntry.genre){
    res.status(400).send('Genre must not be blank');
  }
  else if(!newEntry.description){
    res.status(400).send('Description must not be blank');
  }
  else if(!newEntry.cover_url){
    res.status(400).send('Cover URL must not be blank');
  }

  let response = repo.add(newEntry);
  response.then((responseEntry) => {

    res.send(responseEntry);
    return;
  })
  .catch((err) => {
    return err;
  });
}); //END router.post

router.patch('/:id', (req, res, next)=>{
  let repo = new Repo();
  let updateInfo = req.body;
  let updateId = req.params.id;

  //handles if index val is non a number
  if(isNaN(updateId)){
    res.status(404).send('Not Found');
    return;
  }

  let response = repo.update(updateId, updateInfo);
  response.then((responseEntry) => {

    // handle if out of bounds index
    if(responseEntry.length === 0){
      res.status(404).send('Not Found');
      return;
    }

    res.send(responseEntry);
    return;
  })
  .catch((err)=>{
    return err;
  });

});

router.delete('/:id', (req, res, next) => {
  let repo = new Repo();
  let removeId = req.params.id;
  if(isNaN(removeId)) {
    res.status(404).send('Not Found');
  }
  let response = repo.remove(removeId);

  response
    .then((deletedEntry) => {

      if(deletedEntry[1]){
        res.status(200).send(deletedEntry);
        return;
      }

      res.status(404).send('Not Found');
    })
    .catch((err) => err);
});




module.exports = router;


// localhost:8000/token