'use strict';
const Repo = require('../src/favorites-repository');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const humps = require('humps');

const repo =new Repo();
//GET 1  hits get/fav route
router.get('/', checkForToken, verifyUser, (req, res, next)=>{
  // get2 pull cookie from header and get userID from cookie & check if not null
  //GET4T  if matches then call query Fn - pass userID
  var decoded = jwt.decode(req.cookies.token);

  //GET6 upon return .then( allFAvs)  massage data returning
  repo.query(humps.decamelizeKeys(decoded.sub.id))
    .then(resolvedFavs => {
      //GET7  put data in body and send with status 200
      res.send(humps.camelizeKeys(resolvedFavs));
      return;
    })
    .catch(err => err);
});

router.get('/check',checkForToken, verifyUser, (req, res, next)=>{
  var decoded = jwt.decode(req.cookies.token);
  var bookId = humps.decamelizeKeys(req.query.bookId);

  repo.query(decoded.sub.id, bookId)
    .then(resolvedFavs => {
      if(resolvedFavs.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.send('true');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send('false');
      return;
    })
    .catch(err => err);
});


router.post('/', checkForToken, verifyUser, (req, res, next)=>{

  var decoded = jwt.decode(req.cookies.token);
  var bookId = humps.decamelizeKeys(req.body.bookId);

  repo.add(decoded.sub.id, bookId)
    .then(resolvedAdded => {
      if(resolvedAdded.length === 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Book not found');
        return;
      }
      res.send(humps.camelizeKeys(resolvedAdded[0]));
    })
    .catch(err => err);
});

router.delete('/', checkForToken, verifyUser, (req, res, next)=>{
  var decoded = jwt.decode(req.cookies.token);
  var bookId = humps.decamelizeKeys(req.body.bookId);

  repo.remove(decoded.sub.id, bookId)
    .then(resolvedDeleted => {
      if(resolvedDeleted[1]){
        res.send(humps.camelizeKeys(resolvedDeleted[0]));
        return;
      }
      res.status(404).send('Favorite not found');
    })
    .catch(err => err);
});



function checkForToken(req, res, next){
  if(req.cookies.token){
    next();
    return;
  }
  res.setHeader('Content-Type', 'plain/text');
  res.status(401).send('Unauthorized');
}

function verifyUser(req, res, next){

  //GET 3T if exists, then comparison with jwt.verify()
  jwt.verify(req.cookies.token,
      process.env.JWT_KEY, (err, decoded) => {
    if(decoded){
      next();
      return;
    }
    //GET 4F if no match return 401
    //GET3F  if no JWT .send -401
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send('Unauthorized');
  });
}



module.exports = router;


















