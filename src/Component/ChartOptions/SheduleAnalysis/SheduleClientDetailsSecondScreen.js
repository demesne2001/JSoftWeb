import React from 'react'

export default function SheduleClientDetailsSecondScreen(xAxis, yAxis, contextData, id) {
  const option = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      events: {
        dataPointSelection: (event, chartContex, config) => {
          console.log("clicked");
          if (id[config.dataPointIndex] === null) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
          }
          else {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: id[config.dataPointIndex].toString() })
          }
        }
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
    },
    xaxis: {
      categories: xAxis,
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    fill: {
      type: 'pattern',
      opacity: 1,
      pattern: {
        style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

      }
    },
    states: {
      hover: {
        filter: 'none'
      }
    },
    legend: {
      position: 'bottom',
      offsetY: 40
    }
  }
  const series = [{
    name: 'TotalParty',
    data: yAxis[0]
  }, {
    name: 'VisitedParty',
    data: yAxis[1]
  }]
  return [option, series]
}
