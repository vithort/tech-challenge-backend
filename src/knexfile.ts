import { Config } from 'knex'

import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
})

// this file is used either by the API and the `knex` client tool

if(!process.env.API_SQL_HOST)     throw new Error('Missing ENV variable `API_SQL_HOST`.')
if(!process.env.API_SQL_PORT)     throw new Error('Missing ENV variable `API_SQL_PORT`.')
if(!process.env.API_SQL_SCHEMA)   throw new Error('Missing ENV variable `API_SQL_SCHEMA`.')
if(!process.env.API_SQL_USER)     throw new Error('Missing ENV variable `API_SQL_USER`.')
if(!process.env.API_SQL_PASSWORD) throw new Error('Missing ENV variable `API_SQL_PASSWORD`.')

if(!process.env.MYSQL_ROOT_USER) throw new Error('Missing ENV variable `MYSQL_ROOT_USER`.')
if(!process.env.MYSQL_ROOT_USER) throw new Error('Missing ENV variable `MYSQL_ROOT_USER`.')


const knexConfig: Config = {
  client: 'mysql',
  connection: {
    host: process.env.API_SQL_HOST,
    port: parseInt(process.env.API_SQL_PORT, 10),
    database: process.env.API_SQL_SCHEMA,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
}

export default knexConfig
