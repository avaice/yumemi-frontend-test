import { Chart } from './_components/Chart'
import { getPrefectures } from './_query/server/getPrefectures'

export default async function Home() {
  const prefectures = await getPrefectures()

  return (
    <main>
      <div>
        {prefectures.result.map((v) => (
          <p key={`pref-${v.prefCode}`}>
            {v.prefCode}: {v.prefName}
          </p>
        ))}
      </div>
      <h1>都道府県別の総人口推移</h1>
      <Chart />
    </main>
  )
}

const ErrorPage = () => (
  <main>
    <h1>都道府県別の総人口推移</h1>
    <p>
      必要なデータの読み込みに失敗したため、人口推移が表示できませんでした。
    </p>
  </main>
)
