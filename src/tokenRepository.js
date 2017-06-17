'use strict';

const knex = require('../knex');

class TokenRepository{

// POST-4) receive email - check against db
  authenticate(email){
    // POST-5) get array of objects from knex - return id, db_hashed_pw
    return knex('users')
      .select('id', 'first_name', 'last_name', 'email', 'hashed_password')
      .where({email: email})
      .first();
  }

}

module.exports = TokenRepository;