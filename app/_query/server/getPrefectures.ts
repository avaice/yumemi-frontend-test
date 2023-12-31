import { getFromResasApi } from '../../_utils/getFromResasApi'
import { z } from 'zod'

const prefecturesSchema = z.array(
  z.object({
    prefCode: z.number(),
    prefName: z.string(),
  })
)

const prefecturesDataSchema = z.object({
  message: z.null(),
  result: prefecturesSchema,
})

export type Prefectures = z.infer<typeof prefecturesSchema>

// Privateな環境変数（API_KEY）を使っているので、サーバー側でしか呼び出せない
export const getPrefectures = async () => {
  const prefecturesData = await getFromResasApi('api/v1/prefectures', null)

  const validatedPopulationData = prefecturesDataSchema.parse(prefecturesData)

  return validatedPopulationData
}
