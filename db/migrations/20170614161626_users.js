exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
  table.increments('id').primary();  // NOTE syntax unsure remove if passes
  table.string('first_name').notNullable().defaultTo('');
  table.string('last_name').notNullable().defaultTo('');
  table.string('email').notNullable().unique();   //ALTER TABLE statement will be made
  table.specificType('hashed_password', 'char(60)').notNullable();


  table.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
  .then()
  .catch()
};
