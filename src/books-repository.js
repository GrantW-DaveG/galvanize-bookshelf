'use strict';

class BooksRepository{

  constructor(path){
    this._path = path;
  }

  query(){
    return new Promise( (resolve, reject) => {
      knex('books')
      .then(function (users) {
        res.json({
          "status" : 200,
          "results" : users
        });
      });
    });
  }

  add(item){

    if(item.id && item.title && item.genre && item.author && item.description && item.cover_url){
      item = JSON.parse(item);

      //TODO knex insert statment
      return item;
    }
  }

}