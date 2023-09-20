import { ENVIROMENT_KEY } from './enviromentKey'
import { getFromResasApi } from './getFromResasApi'

// ダミーのデータを返すモック関数を作成
const mockFetch = jest.fn()
global.fetch = mockFetch

const mockResponse = {
  ok: { statusCode: 200, data: 'test data' },
  error: {
    statusCode: 404,
    error: 'Not Found',
  },
}

describe('getFromResasApi', () => {
  beforeEach(() => {
    mockFetch.mockClear() // 各テストケースの前にmockFetchをクリア
  })

  // 正しいAPIとヘッダ情報をつけてfetchできているか？
  it('should make a fetch request with the correct URL and headers', async () => {
    const api = 'example-api'
    const params = new URLSearchParams({ param1: 'value1', param2: 'value2' })

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse.ok),
    })

    await getFromResasApi(api, params)

    expect(mockFetch).toHaveBeenCalledWith(
      `${ENVIROMENT_KEY.RESAS_API_ENDPOINT}/${api}?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': ENVIROMENT_KEY.RESAS_API_KEY,
        },
      }
    )
  })

  // API呼び出しが正常に完了した時、結果データを返しているか？
  it('should return data if the fetch request is successful (status code 200)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse.ok),
    })

    const api = 'example-api'
    const params = null

    const result = await getFromResasApi(api, params)

    expect(result).toEqual(mockResponse.ok)
  })

  // API呼び出しが200以外を返した時、'RESAS API was not returned 200'のエラーが発生するか？
  it('should throw an error if the fetch request fails (non-200 status code)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse.error),
    })

    const api = 'example-api'
    const params = null

    await expect(getFromResasApi(api, params)).rejects.toThrow(
      'RESAS API was not returned 200'
    )
  })
})
