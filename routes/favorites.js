'use strict';
const Repo = require('../src/favorites-repository');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const humps = require('humps');

const repo =new Repo();
// eslint-disable-next-line new-cap
router.get('/', CB)
// YOUR CODE HERE
//GET 1  hits get/fav route
// get2 pull cookie from header and check if not null
//GET 3T if exists, then comparison with jwt.verify()
//GET3F  if no JWT .send -401
//GET4T  if matches then call querfy Fn
//GET 4F if no match return 401
//GET6 upon return .then( allFAvs)  massage data returning
//GET7  put data in body and send with status 200

router.get('/check?bookId=:bookId',cb)

//GET same as one is empty? send FALSE
      //IS !empty? send TRUE

router.post('/', CB)
//POST1  utiolize the fFN we'll make for GET'/' steps'

router.delete('/', CB)
//DELETE1

module.exports = router;
