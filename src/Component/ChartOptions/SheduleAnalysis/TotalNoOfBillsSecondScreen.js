import React from 'react'

export default function TotalNoOfBillsSecondScreen(xAxis, Yaxis, contextData, id) {
  function FormatedSeriesData() {
    var tempseries = []
    for (let i = 0; i < xAxis.length; i++) {
      tempseries.push({ x: xAxis[i], y: Yaxis[0][i] });
    }
    return tempseries
  }
  const options = {
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap',
      events: {
        dataPointSelection: (event, chartContex, config) => {
          if (id[config.dataPointIndex] === null) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
          }
          else {

            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: id[config.dataPointIndex].toString() })
          }
        }
      },
    },
    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB'
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    }
  }
  const series = [{
    data: FormatedSeriesData()
  }]

  return [options, series]
}
