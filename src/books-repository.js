'use strict';

const knex = require('../knex');


class BooksRepository{

  constructor(path){
    this._path = path;
  }

  /*
   *  Pulls info from the DB on all books
   */
  query(id){

    if(!id){
      return knex('books');
    }
    else{
      return knex('books')
        .where('id', id);
    }

  }



  /*
   *  Adding item to the DB
   */
  add(item){

    if(item.title && item.genre && item.author && item.description && item.cover_url){

      //item = JSON.parse(item);
      return knex.insert(item, 'id')
        .into('books')
        .then((ids) => {

          return knex('books')
              .where('id',ids[0]);

        });

    }
  }

}


module.exports = BooksRepository;




