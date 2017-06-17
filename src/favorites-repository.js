const knex = require('../knex');

class FavoritesRepository {
  constructor() {

  }

    //NOTE borrows from books repo'
    // GET5 gets entry by user_ID
  query(id){
    if(!id){
      return knex('books').orderBy('title');
    }
    else{
      return knex('books')
        .where('id', id);
    }

  }
  //NOTE borrows from books repo'
  add(item){

    if(item.title && item.genre && item.author && item.description && item.cover_url){

      return knex.insert(item, 'id')
        .into('books')
        .then((ids) => {

          return knex('books')
              .where('id',ids[0]);
      });
    }
  }

    //NOTE borrows from books repo'

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

}

module.exports = FavoritesRepository;
