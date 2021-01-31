import { knex } from '../util/knex'
import { Movie } from './movies'
import { GenreQty } from './genres'


export interface Actor {
  id: number
  name: string
  bio: string
  bornAt: Date
}

export interface Starred {
  movieName: string
  charName: string
}

export interface ActorStarred extends Actor {
  charName?: Starred[]
}

export interface ActorCharacter extends Actor {
  movies?: Movie[]
}

export interface ActorGenre extends Actor {
  genres?: GenreQty[]
}


export function list(): Promise<Actor[]> {
  return knex.from('actor').select()
}

export function find(id: number): Promise<Actor> {
  return knex.from('actor').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('actor').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string, bio: string, bornAt: Date): Promise<number> {
  const [ id ] = await (knex.into('actor').insert({ name, bio, bornAt }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string, bio: string, bornAt: Date): Promise<boolean>  {
  const count = await knex.from('actor').where({ id }).update({ name, bio, bornAt })
  return count > 0
}

export async function getActorMovies(id: number): Promise<Actor[]> {
  return knex.from('actor').where({ 'actor.id': id})
    .innerJoin('movie_actor', 'movie_actor.idActor', 'actor.id')
    .innerJoin('movie', 'movie.id', 'movie_actor.idMovie')
    .innerJoin('movie_genre', 'movie_genre.idMovie', 'movie.id')
    //.innerJoin('genre', 'genre.id','movie_genre.idGenre')
    .select(
      'actor.id', 'actor.name', 'actor.bio', 'actor.bornAt',
      'movie.id as idMovie', 'movie.name as movieName',
      'movie.synopsis', 'movie.releasedAt', 'movie.runtime'
      //,'genre.id as idGenre', 'genre.name as genreName',
    )
}

export async function getActorCharacters(id: number): Promise<ActorStarred[]> {
  return knex.from('actor').where({ 'actor.id': id})
    .innerJoin('movie_actor', 'movie_actor.idActor', 'actor.id')
    .innerJoin('movie', 'movie.id', 'movie_actor.idMovie')
    .select(
      'actor.id', 'actor.name', 'actor.bio', 'actor.bornAt',
      'movie.id as idMovie', 'movie.name as movieName',
      'movie.synopsis', 'movie.releasedAt', 'movie.runtime',
      'movie_actor.charName',
    )
}

export async function getActorGenre(id: number): Promise<ActorGenre[]> {
  return knex.from('actor').where({ 'actor.id': id})
    .innerJoin('movie_actor', 'movie_actor.idActor', 'actor.id')
    .innerJoin('movie_genre', 'movie_genre.idMovie', 'movie_actor.idMovie')
    .innerJoin('genre', 'genre.id', 'movie_genre.idGenre')
    .select(
      'actor.id', 'actor.name', 'actor.bio', 'actor.bornAt',
      'genre.id as genreId', 'genre.name as genreName'
    )
}
