import { Api } from '@/api/Api'

describe('Api', () => {
  it('has no default base url', () => {
    expect(Api.baseUrl).toBeUndefined()

    const api = new Api()
    expect(api.baseUrl).toBe('')
  })
})
