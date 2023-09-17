import { PopulationChartContainer } from './_components/PopulationChartContainer'
import { PrefecturesSelector } from './_components/PrefecturesSelector'
import { getPrefectures } from './_query/server/getPrefectures'

export default async function Home() {
  const prefectures = await getPrefectures()

  return (
    <main>
      <h1>都道府県別の総人口推移</h1>
      <PrefecturesSelector prefectures={prefectures.result} />
      <PopulationChartContainer />
    </main>
  )
}
