import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

type Props = {
  dataSet: ChartData<'line', number[], string>
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
)

const options = {
  animation: {
    duration: 0,
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    colors: {
      forceOverride: true,
    },
  },
}

export const Chart = ({ dataSet }: Props) => (
  <Line options={options} data={dataSet} />
)
