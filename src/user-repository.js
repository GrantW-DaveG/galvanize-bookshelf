'use strict'

const bcrypt = require('bcrypt');
const knex = require('../knex');

class UsersRepository {
  constructor() {
  }
  authenticate(body){
    return knex('users')
      .select('id', "hashed_password")
      .where({first_name: body.first_name,  last_name: body.last_name, email: body.email});

  }
  register(body){
    // console.log('***********');
    return knex('users')
      .insert({first_name:body.first_name, last_name: body.last_name, email: body.email, hashed_password: body.hashed_password})
      .returning('id', 'first_name', 'last_name', 'email');

  }
}

module.exports = UsersRepository;
