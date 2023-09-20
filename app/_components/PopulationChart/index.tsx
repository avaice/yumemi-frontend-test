import React from 'react'
import { Chart } from '../Chart'
import { PopulationData } from '../PopulationChartContainer'
import { getDataSet } from './getDataSet'

type Props = {
  populationsData: PopulationData[]
  dataType: string
}

const PopulationChartComponent = ({ populationsData, dataType }: Props) => {
  const dataSet = getDataSet(populationsData, dataType)
  return <Chart dataSet={dataSet} />
}

export const PopulationChart = React.memo(PopulationChartComponent)
