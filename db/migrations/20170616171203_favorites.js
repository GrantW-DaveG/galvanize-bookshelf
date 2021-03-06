exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.integer('book_id').references('id').inTable('books').notNullable().onDelete('CASCADE');

    table.timestamps(true, true);
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
}
