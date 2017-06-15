'use strict'

const bcrypt = require('bcrypt');
const knex = require('../knex');

class UsersRepository {
  constructor() {
  }
  authorize(body){
    //must select hashed
    knex('users')
      .select("hashed_password")
      .where({first_name: body.first_name,  last_name: body.last_name, email: body.email})
        .then( resolvedData => {
// https://www.npmjs.com/package/bcrypt BCRYPT THIS SHIT
        })
  }
}

module.exports = UsersRepository;
