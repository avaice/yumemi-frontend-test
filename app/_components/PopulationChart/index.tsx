import React from 'react'
import { Chart } from '../Chart'
import { PopulationData } from '../PopulationChartContainer'

type Props = {
  populationsData: PopulationData[]
}

const getDataSet = (populationsData: PopulationData[]) => {
  if (populationsData.length === 0) {
    return { labels: [], datasets: [] }
  }
  const labels = populationsData[0].data
    .find((v) => v.label === '総人口')!
    .data.map((v) => v.year.toString())
  const datasets = populationsData.map((populationData) => ({
    label: populationData.prefName,
    data: populationData.data
      .find((v) => v.label === '総人口')!
      .data.map((v) => v.value),
  }))

  return { labels, datasets }
}

const PopulationChartComponent = ({ populationsData }: Props) => {
  const dataSet = getDataSet(populationsData)
  return <Chart dataSet={dataSet} />
}

export const PopulationChart = React.memo(PopulationChartComponent)
