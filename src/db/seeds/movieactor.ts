import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex('movie_actor').del()

  // Inserts seed entries
  await knex('movie_actor').insert([
    { id: 1, idMovie: 1, idActor: 1 , charName: 'Wanda Maximoff'},
    { id: 2, idMovie: 1, idActor: 2 , charName: 'Vision'},
    { id: 3, idMovie: 2, idActor: 7 , charName: 'Robert Langdon'},
    { id: 4, idMovie: 2, idActor: 2 , charName: 'Silas'},
    { id: 5, idMovie: 9, idActor: 7 , charName: 'Forrest Gump'},
    { id: 6, idMovie: 3, idActor: 3 , charName: 'Joi'},
    { id: 7, idMovie: 4, idActor: 4 , charName: 'Maxwell Lord'},
    { id: 8, idMovie: 5, idActor: 5 , charName: 'Driss'},
    { id: 9, idMovie: 6, idActor: 6 , charName: 'Laurie'},
    { id: 10, idMovie: 6, idActor: 8 , charName: 'Roland'},
    { id: 11, idMovie: 8, idActor: 7 , charName: 'Chuck Noland'},
    { id: 12, idMovie: 7, idActor: 1 , charName: 'Wanda Maximoff'},
    { id: 13, idMovie: 7, idActor: 2 , charName: 'Vision'},
    { id: 14, idMovie: 7, idActor: 8 , charName: 'Heimdall'}
  ])
}
