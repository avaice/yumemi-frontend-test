import { NextResponse } from 'next/server'
import { getFromResasApi } from '../../_utils/getFromResasApi'
import { createResponse } from '../../_utils/createResponse'
import { z } from 'zod'

const prefCodeSchema = z.number()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const urlParams = new URLSearchParams()
  try {
    const prefCode = prefCodeSchema.parse(Number(searchParams.get('prefCode')))
    urlParams.set('prefCode', prefCode.toString())
  } catch {
    return NextResponse.json(
      createResponse({
        status: 'error',
        reason: 'prefCode (number) is required or invalid type',
      })
    )
  }

  urlParams.set('cityCode', '-')

  const populationData = await getFromResasApi(
    'api/v1/population/composition/perYear',
    urlParams
  )

  if (populationData.result === null) {
    return NextResponse.json(
      createResponse({
        status: 'error',
        reason: 'invalid prefCode',
      })
    )
  }

  return NextResponse.json(
    createResponse({ status: 'ok', data: populationData }),
    {
      headers: {
        // 'Cache-Control': 'max-age=1800',
        // 'CDN-Cache-Control': 'max-age=60',
        // 'Vercel-CDN-Cache-Control': 'max-age=3600',
      },
    }
  )
}
