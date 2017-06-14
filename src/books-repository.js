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

  update(id, changes){


    return knex('books').where('id', id)
      .then((origEntry) => {

        let changedEntry = Object.assign({}, origEntry[0], changes);

        return knex('books')
          .where('id', id)
          .update(changedEntry)
          .returning('*');
      })
  }

  remove(id){

    return knex('books').where('id', id)
      .then( (deletedEntry) => {
        var returnArr = [deletedEntry];

        let deleteOperation = knex('books')
          .where('id', id)
          .del();

        return deleteOperation.then((isDeleted) => {
          returnArr.push(isDeleted);
          return returnArr;
        })
      });
  }

}//END class




module.exports = BooksRepository;




