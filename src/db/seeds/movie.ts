import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movie').del()

  // Inserts seed entries
  await knex('movie').insert([
    { id: 1, name: 'Avengers: Endgame', synopsis: 'After the devastating events of...', releasedAt: new Date('2019-04-25'), runtime: 181 },
    { id: 2, name: 'The Da Vinci Code', synopsis: 'A murder inside the Louvre, and clues in Da Vinci pai ...', releasedAt: new Date('2006-05-19'), runtime: 149 },
    { id: 3, name: 'Blade Runner 2049', synopsis: 'Young Blade Runner K`s discovery of a long-buried sec ...', releasedAt: new Date('2017-10-05'), runtime: 164 },
    { id: 4, name: 'Wonder Woman 1984', synopsis: 'Diana must contend with a work colleague and business ...', releasedAt: new Date('2020-12-17'), runtime: 151 },
    { id: 5, name: 'Intouchables', synopsis: 'After he becomes a quadriplegic from a paragliding acciden ...', releasedAt: new Date('2012-08-31'), runtime: 112 },
    { id: 6, name: 'The Dark Tower', synopsis: 'A boy haunted by visions of a dark tower from a parallel ...', releasedAt: new Date('2017-08-24'), runtime: 152 },
    { id: 7, name: 'Avengers: Infinity War', synopsis: 'The Avengers and their allies must be willing to ...', releasedAt: new Date('2018-04-26'), runtime: 149 },
    { id: 8, name: 'Cast Away', synopsis: 'A FedEx executive undergoes a physical and emotional transfor ...', releasedAt: new Date('2001-01-26'), runtime: 143 },
    { id: 9, name: 'Forrest Gump', synopsis: 'The presidencies of Kennedy and Johnson, the events of Vie ...', releasedAt: new Date('1994-12-07'), runtime: 144 },
  ])
}
