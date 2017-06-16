'use strict';

var bcrypt = require('bcrypt');




const express = require('express');
const Repo = require('../src/user-repository');
const humps = require('humps');
// eslint-disable-next-line new-cap
const router = express.Router();
router.post('/', (req, res, next) =>{
    let repo = new Repo();
    let body = humps.decamelizeKeys(req.body);
    let returnedColumns ={};
    let saltRounds= 12;

    bcrypt.hash(body.password, saltRounds)
      .then(function(hash) {
        body.hashed_password = hash;
        console.log(body.hashed_password);
    })
    repo.register(body)
      .then((resolvedColumns) => {
        console.log(resolvedColumns, "TESSST");
        if (resolvedColumns.length > 0) {
          res.send(resolvedColumns);

        } else {
          res.status(400).send('Not Found');  //NOTE update semantics
          return;
        }
      })
      .catch(err => {
      console.log(err);
      res.send(err);
    });


  });






  router.post('/fail', (req, res, next) =>{
      let repo = new Repo();
      let body = humps.decamelizeKeys(req.body);
      let returnedColumns ={};
      repo.authenticate(body)
        .then((resolvedColumns) => {
          if (resolvedColumns.length > 0) {
            //returned OBJ does not send password
            //will reassign obj K/V
            //Password must be at least 8 characters long
            returnedColumns.id = resolvedColumns[0].id;
            returnedColumns.first_name = body.first_name;
            returnedColumns.last_name = body.last_name;
            returnedColumns.email = body.email;
            // console.log(returnedColumns);
            return bcrypt.compare(body.password, resolvedColumns[0].hashed_password);


          } else {
            res.status(400).send('Not Found');  //NOTE update semantics
            return;
          }
        })
        .then(function(isMatching) {

          if (isMatching) {
            res.send(humps.camelizeKeys(returnedColumns));
            return;
          } else {
            res.status(404).send("NEED MORE ERROR CHECKING");
            return;
          }


      })
      .catch(err => {
        // console.log(err);
        res.send(err);
      });


    })

module.exports = router;
