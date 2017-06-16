
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
  table.increments('id').primary();  
  table.string('title').notNullable().defaultTo('');
  table.string('author').notNullable().defaultTo('');
  table.string('genre').notNullable().defaultTo('');
  table.text('description').notNullable().defaultTo('');
  table.text('cover_url').notNullable().defaultTo('');
  table.timestamps(true, true);
})
.then(function(){
            return knex.raw(`SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))`)
        });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
