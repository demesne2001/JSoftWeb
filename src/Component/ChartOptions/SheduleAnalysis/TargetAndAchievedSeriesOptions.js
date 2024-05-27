import { List } from 'echarts';
import React, { useEffect } from 'react'
import { useNavigationType } from 'react-router-dom';

export default function TargetAndAchievedSeriesOptions(xAxis, yAxis, unit) {
    const series = [
        {
            name: 'TargetWt',
            type: 'column',
            data: yAxis[1]
        },
        {
            name: 'achievedWt',
            type: 'line',
            data: yAxis[0]
        },
        {
            name: 'Prc',
            type: '',
            data: yAxis[2]
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'line',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [4, 4, 0]
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        xaxis: {
            categories: xAxis,
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 5) + '...';
                    }
                }
            }
        },
        yaxis: [
            {
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

            },
            {
                seriesName: 'achievedWt',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#04d8a5'
                },
                labels: {
                    style: {
                        colors: '#04d8a5',
                    },
                },

            },
        ],
        legend: {
            horizontalAlign: 'center',
            offsetX: 40
        },
        tooltip: {
            x: {
                formatter: function (val, config) {
                    return xAxis[config['dataPointIndex']]
                }
            },
            y: {
                formatter: function(val,config) {
                    if (config['seriesIndex'] === 2) {
                        console.log(val);
                        return (val.toFixed(0)).toString() + "%"
                    } else {
                        return (val).toString()+ " " + unit
                    }
                    
                }
            }
        }
    };
    return [options, series]
}
