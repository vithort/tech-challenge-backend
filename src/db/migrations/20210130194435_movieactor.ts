import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie_actor (
      id          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      idMovie     INT(10) UNSIGNED,
      idActor     INT(10) UNSIGNED,
      charName    VARCHAR(50),
      CONSTRAINT FK_movie_actor_movie FOREIGN KEY (idMovie) REFERENCES movies.movie (id) ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT FK_movie_actor_actor FOREIGN KEY (idActor) REFERENCES movies.actor (id) ON UPDATE RESTRICT ON DELETE SET NULL
  );`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_actor;')
}
