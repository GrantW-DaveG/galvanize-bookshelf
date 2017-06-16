'use strict';

const express = require('express');
const Repo = require('../src/books-repository');
const humps = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res, next)=>{
  let repo = new Repo('');
  repo.query()
    .then((resolvedBooks) => {
      resolvedBooks = humps.camelizeKeys(resolvedBooks);
      if(resolvedBooks){
        res.send(resolvedBooks);
      }
      else{
        res.setHeader('Content-Type', 'plain/text');
        res.status(404).send('Not Found');
      }

    });
});

router.get('/:id', (req, res, next)=>{
  let repo = new Repo('');
  repo.query(req.params.id)
    .then((resolvedData)=>{
      resolvedData = humps.camelizeKeys(resolvedData);

      if(resolvedData.length === 0){
        res.setHeader('Content-Type', 'plain/text');
        res.status(404).send('Not Found');
      }
      res.send(resolvedData[0]);
      return;
    })
    .catch((err)=>{
      res.sendStatus(404);
      return err;
    });
});

router.post('/', (req, res, next)=>{
  let newEntry = humps.decamelizeKeys(req.body);
  let repo = new Repo();

  //input validation before add call
  if(!newEntry.title){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send('Title must not be blank');
    return;
  }
  else if(!newEntry.author){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send('Author must not be blank');
    return;
  }
  else if(!newEntry.genre){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send('Genre must not be blank');
    return;
  }
  else if(!newEntry.description){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send('Description must not be blank');
    return;
  }
  else if(!newEntry.cover_url){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send('Cover URL must not be blank');
    return;
  }

  let response = repo.add(newEntry);
  response.then((responseEntry) => {

    let returnObj = {};
    returnObj.id = responseEntry[0].id;
    returnObj.title = responseEntry[0].title;
    returnObj.author = responseEntry[0].author;
    returnObj.genre = responseEntry[0].genre;
    returnObj.description = responseEntry[0].description;
    returnObj.coverUrl = responseEntry[0].cover_url;


    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    res.json(humps.camelizeKeys(returnObj));
    return;
  })
  .catch((err) => {
    return err;
  });
}); //END router.post

router.patch('/:id', (req, res, next)=>{
  let repo = new Repo();
  let updateInfo = humps.decamelizeKeys(req.body);
  let updateId = req.params.id;

  //handles if index val is non a number
  if(isNaN(updateId)){
    res.setHeader('Content-Type', 'plain/text');
    res.status(404).send('Not Found');
    return;
  }

  let response = repo.update(updateId, updateInfo);
  response.then((responseEntry) => {

    // handle if out of bounds index
    if(responseEntry.length === 0){
      res.setHeader('Content-Type', 'plain/text');
      res.status(404).send('Not Found');
      return;
    }

    res.send(humps.camelizeKeys(responseEntry[0]));
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
    res.setHeader('Content-Type', 'plain/text');
    res.status(404).send('Not Found');
  }
  let response = repo.remove(removeId);

  response
    .then((deletedEntry) => {

      if(deletedEntry[1]){
        let returnObj = {};
        returnObj.title = deletedEntry[0][0].title;
        returnObj.author = deletedEntry[0][0].author;
        returnObj.genre = deletedEntry[0][0].genre;
        returnObj.description = deletedEntry[0][0].description;
        returnObj.coverUrl = deletedEntry[0][0].cover_url;
        res.status(200).send(returnObj);
        return;
      }
      res.setHeader('Content-Type', 'plain/text');
      res.status(404).send('Not Found');
    })
    .catch((err) => err);
});




module.exports = router;


// localhost:8000/token