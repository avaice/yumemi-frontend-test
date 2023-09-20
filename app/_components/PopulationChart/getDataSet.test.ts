import { PopulationData } from '../PopulationChartContainer'
import { getDataSet } from './getDataSet'

describe('getDataSet', () => {
  it('should return an empty dataset if populationsData is empty', () => {
    const populationsData: PopulationData[] = []
    const dataType = '総人口'

    const result = getDataSet(populationsData, dataType)

    expect(result).toEqual({ labels: [], datasets: [] })
  })

  it('should return the correct dataset for a given dataType', () => {
    const populationsData: PopulationData[] = [
      {
        prefName: 'Pref1',
        data: [
          {
            data: [
              { value: 100, year: 2020 },
              { value: 120, year: 2021 },
            ],
            label: '総人口',
          },
          {
            data: [
              { value: 100, year: 2020, rate: 10.1 },
              { value: 120, year: 2021, rate: 10.8 },
            ],
            label: '年少人口',
          },
        ],
      },
      {
        prefName: 'Pref2',
        data: [
          {
            data: [
              { value: 200, year: 2020 },
              { value: 220, year: 2021 },
            ],
            label: '総人口',
          },
          {
            data: [
              { value: 100, year: 2020, rate: 12.1 },
              { value: 120, year: 2021, rate: 10.7 },
            ],
            label: '年少人口',
          },
        ],
      },
    ]
    const dataType = '総人口'

    const result = getDataSet(populationsData, dataType)

    expect(result).toEqual({
      labels: ['2020', '2021'],
      datasets: [
        {
          label: 'Pref1',
          data: [100, 120],
        },
        {
          label: 'Pref2',
          data: [200, 220],
        },
      ],
    })
  })
})
