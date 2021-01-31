import { script } from '@hapi/lab'
import { expect } from '@hapi/code'
import sinon from 'sinon'

export const lab = script()
const { beforeEach, before, after, afterEach, describe, it } = lab

import * as Hapi from '@hapi/hapi'
import { genre as plugin } from './index'
import * as lib from '../../lib/genres'

describe('plugin', () => describe('genre', () => {
  const sandbox = Object.freeze(sinon.createSandbox())

  const isContext = (value: unknown): value is Context => {
    if(!value || typeof value !== 'object') return false
    const safe = value as Partial<Context>
    if(!safe.server) return false
    if(!safe.stub) return false
    return true
  }
  interface Context {
    server: Hapi.Server
    stub: Record<string, sinon.SinonStub>
  }
  interface Flags extends script.Flags {
    readonly context: Partial<Context>
  }

  before(async ({ context }: Flags) => {
    context.stub = {
      lib_list: sandbox.stub(lib, 'list'),
      lib_find: sandbox.stub(lib, 'find'),
      lib_remove: sandbox.stub(lib, 'remove'),
      lib_create: sandbox.stub(lib, 'create'),
      lib_update: sandbox.stub(lib, 'update'),
      //lib_find_genre_actors: sandbox.stub(lib, 'getGenreActors'),
    }

    // all stubs must be made before server starts
    const server = Hapi.server()
    await server.register(plugin)
    await server.start()
    context.server = server
  })

  beforeEach(({ context }: Flags) => {
    if(!isContext(context)) throw TypeError()

    context.stub.lib_list.rejects(new Error('test: provide a mock for the result'))
    context.stub.lib_find.rejects(new Error('test: provide a mock for the result'))
    context.stub.lib_remove.rejects(new Error('test: provide a mock for the result'))
    context.stub.lib_create.rejects(new Error('test: provide a mock for the result'))
    context.stub.lib_update.rejects(new Error('test: provide a mock for the result'))
    //context.stub.lib_find_genre_actors.rejects(new Error('test: provide a mock for the result'))
  })

  afterEach(() => sandbox.resetHistory())
  after(() => sandbox.restore())

  describe('GET /genres', () => {
    const [method, url] = ['GET', '/genres']

    it('returns all genres', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      const anyResult = [{'any': 'result'}]
      context.stub.lib_list.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(200)

      sinon.assert.calledOnce(context.stub.lib_list)
      expect(response.result).equals(anyResult)
    })

  })

  describe('POST /genres', () => {
    const [method, url] = ['POST', '/genres']

    it('validates payload is not empty', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const payload = undefined
      const opts: Hapi.ServerInjectOptions = { method, url, payload}

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('validates payload matches `genre`', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const payload = {'some': 'object'}
      const opts: Hapi.ServerInjectOptions = { method, url, payload}

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('returns HTTP 409 when given `name` already exists', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const payload = {'name': 'repeated-name'}
      const opts: Hapi.ServerInjectOptions = { method, url, payload }
      context.stub.lib_create.rejects({ code: 'ER_DUP_ENTRY'})

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(409)
    })

    it('returns HTTP 201, with the `id` and `path` to the row created', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const payload = {'name': 'any-name'}
      const opts: Hapi.ServerInjectOptions = { method, url, payload }
      const anyResult = 123
      context.stub.lib_create.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(201)

      sinon.assert.calledOnceWithExactly(context.stub.lib_create, payload.name)
      expect(response.result).equals({
        id: anyResult,
        path: `/genres/${anyResult}`
      })
    })

  })

  describe('GET /genres/:id', () => {
    const paramId = 123
    const [method, url] = ['GET', `/genres/${paramId}`]

    it('validates :id is numeric', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url: 'not-a-number' }

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('returns HTTP 404 when :id is not found', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      context.stub.lib_find.resolves(null)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(404)
    })

    it('returns one genre', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      const anyResult = {'any': 'result'}
      context.stub.lib_find.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(200)

      sinon.assert.calledOnceWithExactly(context.stub.lib_find, paramId)
      expect(response.result).equals(anyResult)
    })

  })

  describe('PUT /genres/:id', () => {
    const paramId = 123
    const [method, url, payload] = ['PUT', `/genres/${paramId}`, {'name': 'any-name'}]

    it('validates payload is not empty', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url, payload: undefined}

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('validates payload matches `genre`', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url, payload: {'unexpected': 'object'}}

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('returns HTTP 404 when :id is not found', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url, payload }
      context.stub.lib_update.resolves(0)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(404)
    })

    it('returns HTTP 409 when given `name` already exists', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url, payload }
      context.stub.lib_update.rejects({ code: 'ER_DUP_ENTRY'})

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(409)
    })

    it('returns HTTP 204', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url, payload }
      const anyResult = 123
      context.stub.lib_update.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(204)

      sinon.assert.calledOnceWithExactly(context.stub.lib_update, paramId, payload.name)
      expect(response.result).to.be.null()
    })

  })

  describe('DELETE /genres/:id', () => {
    const paramId = 123
    const [method, url] = ['DELETE', `/genres/${paramId}`]

    it('validates :id is numeric', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url: 'not-a-number' }

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('returns HTTP 404 when :id is not found', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      context.stub.lib_remove.resolves(0)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(404)
    })

    it('returns HTTP 204', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      const anyResult = {'any': 'result'}
      context.stub.lib_remove.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(204)

      sinon.assert.calledOnceWithExactly(context.stub.lib_remove, paramId)
      expect(response.result).to.be.null()
    })

  })

  /*
  describe('GET /getGenreActors/:id', () => {
    const paramId = 1
    const [method, url] = ['GET', `/getGenreActors/${paramId}`]

    it('validates :id is numeric', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url: 'not-a-number' }

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(400)
    })

    it('returns HTTP 404 when :id is not found', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      context.stub.lib_find.resolves(null)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(404)
    })

    it('returns genre with all actors in that genre', async ({ context }: Flags) => {
      if(!isContext(context)) throw TypeError()
      const opts: Hapi.ServerInjectOptions = { method, url }
      const anyResult = {'any': 'result'}
      context.stub.lib_find.resolves(anyResult)

      const response = await context.server.inject(opts)
      expect(response.statusCode).equals(200)

      sinon.assert.calledOnceWithExactly(context.stub.lib_find, paramId)
      expect(response.result).equals(anyResult)
    })

  })
  */

}))
