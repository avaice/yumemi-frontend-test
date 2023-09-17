import { getFromResasApi } from '@/app/api/_utils/getFromResasApi'
import { z } from 'zod'

const prefecturesDataSchema = z.object({
  message: z.null(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    })
  ),
})

export const getPrefectures = async () => {
  const prefecturesData = await getFromResasApi('api/v1/prefectures', null)

  const validatedPopulationData = prefecturesDataSchema.parse(prefecturesData)

  return validatedPopulationData
}
