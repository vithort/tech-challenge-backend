import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie (
      id          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(50),
      synopsis    VARCHAR(255),
      releasedAt  DATE,
      runtime     INT(10)
  );`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie;')
}
