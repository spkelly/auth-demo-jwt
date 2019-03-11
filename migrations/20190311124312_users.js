
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
    table.increments('user_id').notNull().primary();
    table.string('display_name').notNull();
    table.string('image_url');
    table.string('email').unique().notNull();
    table.string('hash').notNull();
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
