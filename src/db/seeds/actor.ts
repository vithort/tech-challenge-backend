import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('actor').del()

  // Inserts seed entries
  await knex('actor').insert([
    { id: 1, name: 'Elizabeth Olsen', bio: 'Elizabeth Chase "Lizzie" Olsen (born February 16, 1989) is an American actress.' , bornAt: new Date('1989-02-23') },
    { id: 2, name: 'Paul Bettany', bio: 'Paul Bettany is an English actor. He first came to the attention of mainstream ...' , bornAt: new Date('1971-05-27') },
    { id: 3, name: 'Ana de Armas', bio: 'Ana de Armas was born in Cuba on April 30, 1988. At the age of 14, she began he...' , bornAt: new Date('1988-04-30') },
    { id: 4, name: 'Pedro Pascal', bio: 'Pedro Pascal is a Chilean-born actor. He is best known for portraying the roles...' , bornAt: new Date('1975-04-02') },
    { id: 5, name: 'Omar Sy', bio: 'Omar Sy was born on January 20, 1978 in Trappes, Yvelines, France. He is an actor an...' , bornAt: new Date('1978-01-20') },
    { id: 6, name: 'Katheryn Winnick', bio: 'Canadian actress, director and producer Katheryn Winnick stars in the criti...' , bornAt: new Date('1977-12-17') },
    { id: 7, name: 'Tom Hanks', bio: 'Thomas Jeffrey Hanks was born in Concord, California, to Janet Marylyn (Frager), a...' , bornAt: new Date('1956-07-09') },
    { id: 8, name: 'Idris Elba', bio: 'An only child, Idrissa Akuna Elba was born and raised in London, England. His fat...' , bornAt: new Date('1972-09-06') }
  ])
}
