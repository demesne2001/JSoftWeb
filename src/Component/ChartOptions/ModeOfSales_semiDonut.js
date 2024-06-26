export function ModeofSales_semiDonut(name, column, prc) {

  const options = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },

      },
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {

        return prc[opts.seriesIndex] + "%"
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          if (column === 'Prc') {
            return val.toString() + "%"
          } else {
            return val
          }
        }
      }
    },
    colors: ['#51bde4', '#265cb9', '#00e396'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
      }
    }],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10
      }
    },
    labels: name
  }

  return options

}
