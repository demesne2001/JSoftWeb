export function CityWise_Bar(name, column){
    const options = {
        chart: {
            type: 'bar',
            name:'weight',
            height: 350,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val
                }
            },
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
        plotOptions: {
            bar: {
                columnWidth: '0%',
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        // xaxis: {
        // 	categories: name,

        // 	formatter: function (val) {

        // 		return val.length
        // 	}

        // },
        xaxis: {
            categories: name,


        },
        yaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    if (val.length > 7) {
                        return val.slice(0, 6) + "..."
                    } else {
                        return val
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 1491,
            options: {
                
                xaxis:{
                    labels:{
                        formatter: function(val) {
                            
                          return ((val/1000).toFixed(0)).toString() + "KG"
                        
                        }
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        formatter: function (val) {
                            if (val.length > 3) {
                                return val.slice(0, 3) + "..."
                            } else {
                                return val
                            }
                        }
                    }
                }
            },
        }]
        
    }
    return options
}
