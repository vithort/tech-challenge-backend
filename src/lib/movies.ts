import { knex } from '../util/knex'
import { Genre } from './genres'


export interface Movie {
  id: number
  name: string
  synopsis?: string
  releasedAt: Date
  runtime: number // minutes
}

export interface MovieGenre extends Movie {
  genre?: Genre[]
}

export function list(): Promise<Movie[]> {
  return knex.from('movie').select()
}

export function find(id: number): Promise<Movie> {
  return knex.from('movie').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('movie').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string, synopsis: string, releasedAt: Date, runtime: number): Promise<number> {
  const [ id ] = await (knex.into('movie').insert({ name, synopsis, releasedAt, runtime }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string, synopsis: string, releasedAt: Date, runtime: number): Promise<boolean>  {
  const count = await knex.from('movie').where({ id }).update({ name, synopsis, releasedAt, runtime })
  return count > 0
}
