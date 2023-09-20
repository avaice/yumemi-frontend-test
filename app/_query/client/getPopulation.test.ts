import { getPopulation } from './getPopulation'

import mockOkData from './mockOk.json'
import mockErrorData from './mockError.json'
import mockInvalidData from './mockInvalid.json'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('getPopulation', () => {
  beforeEach(() => {
    mockFetch.mockClear() // 各テストケースの前にmockFetchをクリア
  })

  // API呼び出しが正常に完了した時、結果データを返しているか？
  it('should return data if the fetch request is successful (status code 200)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockOkData),
    })

    const result = await getPopulation(1)

    expect(result).toEqual(mockOkData)
  })

  // API呼び出しが200以外を返した時、エラーデータを返しているか？
  it('should return an error if the fetch request fails (non-200 status code)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorData),
    })

    const result = await getPopulation(2)

    expect(result).toEqual(mockErrorData)
  })

  // APIが不正なデータを返した場合、型エラーになるか？
  it('should throw an type error if the fetch request returns invalid data', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInvalidData),
    })
    await expect(() => getPopulation(3)).rejects.toThrow(Error)
  })
})
