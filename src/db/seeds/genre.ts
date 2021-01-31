import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('genre').del()

  // Inserts seed entries
  await knex('genre').insert([
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Mystery' },
    { id: 5, name: 'Thriller' },
    { id: 6, name: 'Fantasy' },
    { id: 7, name: 'Biography' },
    { id: 8, name: 'Comedy' },
    { id: 9, name: 'Romance' },
  ])
}
