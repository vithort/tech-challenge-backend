import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE actor (
      id      INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name    VARCHAR(50),
      bio     VARCHAR(255),
      bornAt  DATE
  );`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE actor;')
}
