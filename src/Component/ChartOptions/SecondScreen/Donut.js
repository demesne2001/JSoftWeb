export function secondScreen_donut(name, contexData , id , filterKey){

    const options = {
        stroke: {
            width: 0,
        },

        chart: {
            type: 'donut',
            animations: {
                enabled: true,
                easing: 'easein',
            },
            events:{
                dataPointSelection:(event,chartContex,config)=>{
                   
                    
                    
                    
                    // contexData.setDefaultChart({...contexData.defaultchart,["strBranch"] : config.w.config.xaxis.categories[config.dataPointIndex] })
                    //   console.log(id[config.dataPointIndex])
                  
                    if(id[config.dataPointIndex] === null){
                        // console.log('INSIDE NULL')
                        contexData.setDefaultChart({...contexData.defaultchart,[filterKey] : '-' })
                      }
                    else if(id[config.dataPointIndex].toString() === contexData.defaultchart[filterKey]){
                        contexData.setDefaultChart({...contexData.defaultchart,[filterKey] : '' })
                    }
                      else{
                        contexData.setDefaultChart({...contexData.defaultchart,[filterKey] : id[config.dataPointIndex].toString() })
                      }
                   
                   
                    
                    // console.log(config.w.config.xaxis.categories[config.dataPointIndex])
                    

                    // console.log(config.w.config.series[0].data[config.dataPointIndex],config.w.config.xaxis.categories[config.dataPointIndex])
    
                }
              }
            // toolbar: {
            // 	show: true,
            // 	offsetX: 0,
            // 	offsetY: 0,
            // 	tools: {
            // 		download: true,
            // 	},

            // },
        },

        dataLabels: {
            opacity: 0.9,
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.6
            },
            enabled: true,
            formatter: function (val, opts) {
                return (val.toFixed(2)) + '%'
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 100,
                colors: ['#fff'],

            },
            background: {
                enabled: false,
            }

        },
        tooltip: {
            enabled: false,
            y: {
                formatter: function (val) {
                    return (parseFloat(val).toFixed(2)).toString() + "%"
                }
            }
        },


        fill: {
            type: 'solid',
            opacity: 2
        },

        legend: {
            show: true,
            floating: false,
            fontSize: '13px',
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                width: 12,
                height: 12
            }
        },

        labels: name,

        responsive: [
            {
                breakpoint: 850,
                options: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ],

        plotOptions: {
            pie: {
                customScale: 0.9,
                donut: {
                    labels: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 360,
                        hollow: {
                            size: '10%',
                        },
                        show: true,
                        name: {
                            show: true,
                            fontSize: '25px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: undefined,
                            offsetY: 0,
                            formatter: function (val) {
                                return val
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '25px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 16,
                            formatter: function (val) {
                                // return (parseFloat(val).toFixed(2)).toString()
                                return (parseFloat(val).toFixed(2)).toString() + "%"
                            }
                        },
                    }
                }
            }
        }
    }
    return options
}