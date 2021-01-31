import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex('movie_genre').del()

  // Inserts seed entries
  await knex('movie_genre').insert([
    { id: 1, idMovie: 1, idGenre: 1 },
    { id: 2, idMovie: 1, idGenre: 2 },
    { id: 3, idMovie: 1, idGenre: 3 },
    { id: 4, idMovie: 2, idGenre: 4 },
    { id: 5, idMovie: 2, idGenre: 5 },
    { id: 6, idMovie: 3, idGenre: 1 },
    { id: 7, idMovie: 3, idGenre: 3 },
    { id: 8, idMovie: 3, idGenre: 4 },
    { id: 9, idMovie: 4, idGenre: 1 },
    { id: 10, idMovie: 4, idGenre: 2 },
    { id: 11, idMovie: 4, idGenre: 6 },
    { id: 12, idMovie: 5, idGenre: 7 },
    { id: 13, idMovie: 5, idGenre: 8 },
    { id: 14, idMovie: 5, idGenre: 3 },
    { id: 15, idMovie: 6, idGenre: 1 },
    { id: 16, idMovie: 6, idGenre: 2 },
    { id: 17, idMovie: 6, idGenre: 6 },
    { id: 18, idMovie: 8, idGenre: 2 },
    { id: 19, idMovie: 8, idGenre: 3 },
    { id: 20, idMovie: 8, idGenre: 9 },
    { id: 21, idMovie: 9, idGenre: 3 },
    { id: 22, idMovie: 9, idGenre: 9 },
    { id: 23, idMovie: 7, idGenre: 1 },
    { id: 24, idMovie: 7, idGenre: 2 },
    { id: 25, idMovie: 7, idGenre: 10 },
  ])
}
