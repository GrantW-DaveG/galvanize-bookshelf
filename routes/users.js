'use strict';

const express = require('express');
const Repo = require('../src/users-repository');
const humps = require('humps');
// eslint-disable-next-line new-cap
const router = express.Router();
router.post('/', (req, res, next) =>{
    let repo = new Repo();
    let body = humps.decamelizeKeys(req.body);

    repo.authorize(body)
      .then((resolveSOMETHING) => {
        if (resolveSOMETHING) {
          //returned OBJ does not send password
          //will reassign obj K/V

          res.send(resolveSOMETHING);
        } else {
          res.status(400).send('Not Found');  //NOTE update semantics
        }
      })



  })

module.exports = router;
