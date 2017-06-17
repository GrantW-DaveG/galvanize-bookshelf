'use strict'

const bcrypt = require('bcrypt');
const knex = require('../knex');

class UsersRepository {

  register(body){
    return knex.insert({first_name:body.first_name, last_name: body.last_name, email: body.email, hashed_password: body.hashed_password}, 'id')
      .into('users')
      .then((ids) => {
        return knex('users')
            .select('id', 'first_name', 'last_name', 'email')
            .where('id',ids[0]);
    });
  }
}

module.exports = UsersRepository;
