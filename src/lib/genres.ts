import { knex } from '../util/knex'
import { Actor } from './actors'


export interface Genre {
  id: number
  name: string
}

export interface GenreActors extends Genre {
  actors: Actor[]
}


export function list(): Promise<Genre[]> {
  return knex.from('genre').select()
}

export function find(id: number): Promise<Genre> {
  return knex.from('genre').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('genre').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string): Promise<number> {
  const [ id ] = await (knex.into('genre').insert({ name }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string): Promise<boolean>  {
  const count = await knex.from('genre').where({ id }).update({ name })
  return count > 0
}

export function getGenreActors(id: number): Promise<GenreActors[]> {
  return knex.from('genre').where({ 'genre.id': id})
    .innerJoin('movie_genre', 'movie_genre.idGenre', 'genre.id')
    .innerJoin('movie_actor', 'movie_actor.idMovie', 'movie_genre.idMovie')
    .innerJoin('actor', 'actor.id', 'movie_actor.idActor')
    .distinct()
    .select(
      'genre.id', 'genre.name',
      'actor.id as actorId', 'actor.name as actorName',
      'actor.bio as actorBio', 'actor.bornAt as actorBornAt'
    )
}
