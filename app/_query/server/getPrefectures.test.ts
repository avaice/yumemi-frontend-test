import mockOkData from './mockOk.json'
import mockInvalidData from './mockInvalid.json'
import { getPrefectures } from './getPrefectures'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('getPrefectures', () => {
  beforeEach(() => {
    mockFetch.mockClear() // 各テストケースの前にmockFetchをクリア
  })

  // API呼び出しが正常に完了した時、結果データを返しているか？
  it('should return data if the fetch request is successful (status code 200)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockOkData),
    })

    const result = await getPrefectures()

    expect(result).toEqual(mockOkData)
  })

  // APIが不正なデータを返した場合、型エラーになるか？
  it('should throw an type error if the fetch request returns invalid data', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInvalidData),
    })
    await expect(() => getPrefectures()).rejects.toThrow(Error)
  })
})
