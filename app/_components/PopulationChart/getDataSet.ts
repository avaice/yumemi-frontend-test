import { PopulationData } from '../PopulationChartContainer'

// 人口データからChart表示に必要なデータセットへ加工する
export const getDataSet = (
  populationsData: PopulationData[],
  dataType: string
) => {
  if (populationsData.length === 0) {
    return { labels: [], datasets: [] }
  }
  const labels = populationsData[0].data
    .find((v) => v.label === dataType)!
    .data.map((v) => v.year.toString())
  const datasets = populationsData.map((populationData) => ({
    label: populationData.prefName,
    data: populationData.data
      .find((v) => v.label === dataType)!
      .data.map((v) => v.value),
  }))

  return { labels, datasets }
}
