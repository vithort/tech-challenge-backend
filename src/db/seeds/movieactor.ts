import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex('movie_actor').del()

  // Inserts seed entries
  await knex('movie_actor').insert([
    { id: 1, idMovie: 1, idActor: 1 },
    { id: 2, idMovie: 1, idActor: 2 },
    { id: 3, idMovie: 2, idActor: 7 },
    { id: 4, idMovie: 2, idActor: 2 },
    { id: 5, idMovie: 9, idActor: 7 },
    { id: 6, idMovie: 8, idActor: 7 },
    { id: 7, idMovie: 3, idActor: 3 },
    { id: 8, idMovie: 4, idActor: 4 },
    { id: 9, idMovie: 5, idActor: 5 },
    { id: 10, idMovie: 6, idActor: 6 },
    { id: 11, idMovie: 6, idActor: 8 },
    { id: 12, idMovie: 8, idActor: 7 },
    { id: 13, idMovie: 9, idActor: 7 },
    { id: 14, idMovie: 7, idActor: 1 },
    { id: 15, idMovie: 7, idActor: 2 }
    { id: 16, idMovie: 7, idActor: 8 }
  ])
}
