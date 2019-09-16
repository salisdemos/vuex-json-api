import { startServer } from '../server'

import { Api } from '@/api/Api'

// test constructor defaults
describe('Api', () => {
  it('has no default base url', () => {
    expect(Api.baseUrl).toBeUndefined()

    const api = new Api()
    expect(api.baseUrl).toBe('')
  })
})

describe('Api', () => {
  let api = null

  beforeAll(() => {
    await startServer(3000)
    api = new Api()
    api.setBaseUrl('http://localhost:3000/')
  })

  it('sends requests to the server')
})
