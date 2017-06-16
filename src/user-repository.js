'use strict'

const bcrypt = require('bcrypt');
const knex = require('../knex');

class UsersRepository {
  constructor() {
  }
  authenticate(body){
    //must select hashed
    // console.log(body);
    return knex('users')
      .select('id', "hashed_password")
      .where({first_name: body.first_name,  last_name: body.last_name, email: body.email});

  }
  register(body){
    //must select hashed
    // console.log(body.hashed_password);
    return knex('users')
      .insert({first_name:body.first_name, last_name: body.last_name, email: body.email, hashed_password: body.hashed_password})
      .whereNotExists(knex('users').where('email', body.email))
      .returning('id', 'first_name', 'last_name', 'email');

  }
}

module.exports = UsersRepository;
