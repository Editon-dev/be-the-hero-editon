exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.decimal('whatsapp',12).notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  
}; 