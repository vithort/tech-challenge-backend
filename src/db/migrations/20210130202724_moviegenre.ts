import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie_genre (
      id          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      idMovie     INT(10) UNSIGNED,
      idGenre     INT(10) UNSIGNED,
      CONSTRAINT FK_movie_genre_genre FOREIGN KEY (idGenre) REFERENCES movies.genre (id) ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT FK_movie_genre_movie FOREIGN KEY (idMovie) REFERENCES movies.movie (id) ON UPDATE CASCADE ON DELETE SET NULL
  );`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_genre;')
}
