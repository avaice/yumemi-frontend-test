import { NextResponse } from 'next/server'
import { getFromResasApi } from '../_utils/getFromResasApi'
import { createResponse } from '../../_utils/createResponse'
// import { z } from 'zod'

// const prefecturesDataSchema = z.object({
//   message: z.string(),
//   result: z.array(
//     z.object({
//       prefCode: z.number(),
//       prefName: z.string(),
//     })
//   ),
// })

export async function GET(_request: Request) {
  const prefecturesData = await getFromResasApi('api/v1/prefectures', null)

  // const validatedPrefecturesData = prefecturesDataSchema.parse(prefecturesData)

  return NextResponse.json(
    createResponse({ status: 'ok', data: prefecturesData })
  )
}
