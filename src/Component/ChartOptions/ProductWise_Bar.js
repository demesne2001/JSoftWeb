export function ProductWise_Bar(name, column) {
	const options = {
		colors: ['#003fad'],
		chart: {
			offsetY: -20,
			offsetX: -10,
			type: 'bar',
			height: 350
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true,
			}
		},
		tooltip: {
			x: {
				show: true,
				formatter: function (val) {
					return val
				}
			},
			y: {
				show: true,
				formatter: function (val) {
					if (column === 'Prc') {
						console.log(column, "column");
						return val.toString() + "%"
					} else {
						return val
					}
				}
			},
		},
		dataLabels: {
			enabled: false,
		},

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
			},
		},
		responsive: [{
			breakpoint: 593,
			options: {

				xaxis: {
					labels: {
						formatter: function (val) {

							return ((val / 1000).toFixed(0)).toString() + "KG"

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