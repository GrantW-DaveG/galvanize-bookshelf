const knex = require('../knex');

class FavoritesRepository {

    // GET5 gets entry by user_ID
  query(userId, bookId){
    if(!bookId){
      return knex('favorites')
          .where('user_id', userId)
          .innerJoin('books', 'favorites.book_id', 'books.id');
    }
    else{
      return knex('favorites')
        .where({user_id: userId, book_id: bookId});
    }
  }

  add(userId, bookId){

    return this.query(userId, bookId)
      .then((fav) => {
        if(fav.length > 0){
          return fav;
        }
        return knex.insert({book_id: bookId, user_id: userId})
          .into('favorites')
          .returning('*');
      });
  }


  remove(userId, bookId){
    var returnArr = [];
    return knex('favorites')
        .where({user_id: userId, book_id: bookId})
      .then( (deletedEntries) => {
        returnArr.push(deletedEntries[0]);

        return knex('favorites')
          .where('id', deletedEntries[0].id)
          .del();
        })
        .then((isDeleted) => {
          returnArr.push(isDeleted);
          delete returnArr[0].id;
          return returnArr;
    });
  }
} //END class

module.exports = FavoritesRepository;
