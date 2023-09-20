import React from 'react'
import { Chart } from '../Chart'
import { PopulationData } from '../PopulationChartContainer'

type Props = {
  populationsData: PopulationData[]
  dataType: string
}

// 人口データからChart表示に必要なデータセットへ加工する
const getDataSet = (populationsData: PopulationData[], dataType: string) => {
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

const PopulationChartComponent = ({ populationsData, dataType }: Props) => {
  const dataSet = getDataSet(populationsData, dataType)
  return <Chart dataSet={dataSet} />
}

export const PopulationChart = React.memo(PopulationChartComponent)
