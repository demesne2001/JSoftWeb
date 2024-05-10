import React from 'react'

export default function ExpenseComboChart(xAxis, yAxis, contextData, id) {
    const series = [{
        name: 'TargetWt',
        type: 'column',
        data: yAxis[0]
    }, {
        name: 'salesWT',
        type: 'column',
        data: yAxis[1]
    }, {
        name: 'kgPerEx',
        type: 'line',
        data: yAxis[2]
    }, {
        name: 'TripPerEx',
        type: 'line',
        data: yAxis[3]
    }]
    const options = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    if (id[config.dataPointIndex] === null) {
                        contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: '-' })
                    }
                    else {

                        contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id[config.dataPointIndex].toString() })
                    }
                }
            },
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4, 4]
        },

        xaxis: {
            categories: xAxis,
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 5) + '...'
                    }
                }
            }
        },
        yaxis: [
            {
                min: 0,
                seriesName: 'TargetWt',
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "TargetWt",
                    style: {
                        color: '#008FFB',
                    }
                },

            },
            {
                min: 0,
                seriesName: 'salesWT',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "salesWT",
                    style: {
                        color: '#00E396',
                    }
                },
            },
            {
                seriesName: 'kgPerEx',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: "kgPerEx",
                    style: {
                        color: '#FEB019',
                    }
                }
            },
            {
                seriesName: 'TripPerEx',
                opposite: false,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#fe645c'
                },
                labels: {
                    style: {
                        colors: '#fe645c',
                    },

                },
                title: {
                    text: "TripPerEx",
                    style: {
                        color: '#fe645c',
                    }
                }
            },
        ],
        tooltip: {
            x: {
                show: true,
                formatter: function (val, e) {
                    console.log(e);
                    return xAxis[e.dataPointIndex]
                }
            },
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    }
    return [options, series]
}
