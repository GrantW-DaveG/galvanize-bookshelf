'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const Repo = require('../src/tokenRepository');
const saltrounds = 12;

var repo = new Repo();

// GET-1) hits with GET /token router
router.get('/', checkForToken, (req, res) => {
  // GET-4t) if token exists, rehash the token head and payload and secret and compare to jwt.
  jwt.verify(req.cookies.token,
      process.env.JWT_KEY, (err, decoded) => {
      // GET-5t) if jwt matches, return 200, true END
    if(decoded){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send('true');
      return;
    }
    throw err;
  });
});



// POST-1) hits POST /token route
router.post('/', (req, res, next) => {

  // POST-2) validate contents of body - makes sure it body has an email and a password
  if(req.body.email && req.body.password){

    var payload = {sub:{}};
    var resBody = {};
    // POST-3) call function to fetch hashed_pw, id where email against db
    repo.authenticate(req.body.email)
      .then((credentials) => {
        // POST-6) receive id/db_hashed_pw
        // POST-7) compare hashed_pw with db_hashed_pw
        // 400 bad email
        if(!credentials){
          res.setHeader('Content-Type', 'plain/text');
          res.status(400).send('Bad email or password');
          return;
        }
        payload.sub.id = credentials.id;

        resBody.id = credentials.id;
        resBody.firstName = credentials.first_name;
        resBody.lastName = credentials.last_name;
        resBody.email = credentials.email;

        return bcrypt.compare(req.body.password, credentials.hashed_password);
      })
      .then((isMatching) => {
        if(isMatching){
          // POST-8t) if match, sign Token
          let newToken = jwt.sign(payload, process.env.JWT_KEY);
          // POST-9) Add token to cookie header ('set-cookie') in res & {id} in payload
          res.cookie('token',newToken, {httpOnly: true });
          // POST-10) send response END
          res.status(200).send(resBody);
          return;
        }
        else{
          // POST-8f) if no match, reject - bad pw
          res.setHeader('Content-Type', 'plain/text');
          res.status(400).send('Bad email or password');
          return;
        }
      })
      .catch(err => err);
  }
});


router.delete('/', (req, res, next)=>{
  // res.cookie('token', '');
  res.setHeader('Set-Cookie', 'token=; Path=\/');
  res.status(200).send('true');
});





function checkForToken(req, res, next){
  // GET-2) parse cookies
  // GET-3) check token exists and has contents
  if(req.cookies.token){
    next();
    return;
  }
  // GET-4f) if doesn't exist, it sends 200 false END
  else{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('false');
    return;
  }

}


module.exports = router;



