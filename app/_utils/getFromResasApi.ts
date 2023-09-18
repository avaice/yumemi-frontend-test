import { ENVIROMENT_KEY } from './enviromentKey'

export const getFromResasApi = async (
  api: string,
  params: URLSearchParams | null
) => {
  const stringifiedParams = params ? `?${params.toString()}` : ''
  const res = await fetch(
    `${ENVIROMENT_KEY.RESAS_API_ENDPOINT}/${api}${stringifiedParams}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ENVIROMENT_KEY.RESAS_API_KEY,
      },
    }
  )
  const data = await res.json()
  if (data.statusCode && data.statusCode !== 200) {
    throw new Error('RESAS API was not returned 200')
  }

  return data
}
