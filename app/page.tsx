import { Chart } from './_components/Chart'
import { PrefecturesSelector } from './_components/PrefecturesSelector'
import { getPrefectures } from './_query/server/getPrefectures'

export default async function Home() {
  const prefectures = await getPrefectures()

  return (
    <main>
      <PrefecturesSelector prefectures={prefectures.result} />
      <h1>都道府県別の総人口推移</h1>
      <Chart />
    </main>
  )
}
