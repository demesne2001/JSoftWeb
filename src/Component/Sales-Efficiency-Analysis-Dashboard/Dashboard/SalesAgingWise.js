import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';

export default function SalesAgingWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [optionId, setOptionId] = useState()

	const [flag, setflag] = useState("line")
	const ChartType = "line"

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
			// console.log('Updationg option')
			setflag(e.target.id)
		}
		else {
			// console.log("NOT UPDATING OPTIOJN")
		}

	}


	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.[rd.caption]' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['rd.caption'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['rd.caption'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
				}
				setName(name)
				setweight(weight)
				setdataLoader(false)
				if (weight.length !== 0) {
					setLoader(false)
				} else {
					setLoader(true)
				}
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}




	if (flag === 'line') {
		var series = [{
			type: 'line',
			data: weight,
			name: 'weight'
		}]

		var options = {
			chart: {
				toolbar: {
					show: true,
					offsetX: 0,
					offsetY: 0,
					tools: {
						download: true,
					},

				},
				height: 350,
				type: 'line',

				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.2
				}
			},
			// colors: ['#77B6EA', '#545454'],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				colors: '#008ae6',
				curve: 'straight',
				width: 6
			},
			fill: {
				opacity: 1,
				type: 'solid',
				gradient: {
					show: false,
					shade: 'dark',
					//   type: "vertical",
					shadeIntensity: 0.2,
					// gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 2,
					opacityTo: 2,
					// stops: [0, 50, 100],
					// colorStops: []
				},
			},
			title: {
				text: '',
				align: 'left'
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			markers: {
				size: 1
			},
			xaxis: {
				categories: name,
				title: {
					text: 'Month'
				}
			},
			yaxis: {
				title: {
					text: ''
				},

			},
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				floating: true,
				offsetY: -25,
				offsetX: -5
			},
			tooltip: {

				y: {
					show: true,
					formatter: function (val) {
						return val
					}
				},
			},
			responsive: [{
				breakpoint: 593,
				options: {

					xaxis: {
						labels: {
							// formatter: function (val) {
							// 	if (val !== undefined) {
							// 		if (val.length > 3) {
							// 			return val.slice(0, 3) + "..."
							// 		} else {
							// 			return val
							// 		}
							// 	}

							// }

						}
					},
					yaxis: {
						labels: {
							show: true,
							formatter: function (val) {

								return ((val / 1000).toFixed(0)).toString() + "KG"

							}


						}
					}
				},
			}]
		}
	}


	else if (flag === 'area') {
		var series = [{
			type: 'area',
			data: weight,
			name: 'weight'
		}]


		var options = {
			chart: {
				type: 'area',
				height: 350,
				zoom: {
					enabled: true
				}
			},
			dataLabels: {
				enabled: false
			},
			plotOptions: {
				area: {
					fillTo: 'end',
				},
			},
			stroke: {
				curve: 'smooth',
				show: true,
				width: 2,
				colors: ['#008ae6']
			},

			fill: {
				opacity: 0.1,
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: "vertical",
					shadeIntensity: 0.2,
					// gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 1.5,
					opacityTo: 0.6,
					// stops: [0, 50, 100],
					// colorStops: []
				},
			},

			labels: name,

			grid: {
				yaxis: {
					lines: {
						offsetX: -30
					}
				},
				padding: {
					left: 20
				}
			},

			yaxis: {
				tickAmount: 4,
				floating: false,

				labels: {
					style: {
						colors: '#8e8da4',
					},
					offsetY: -7,
					offsetX: 0,
				},

				// axisBorder: {
				//   show: false,
				// },
				// axisTicks: {
				//   show: false
				// }
			},
			// colors: ['#008ae6'],

			legend: {
				show: false,
				horizontalAlign: 'left'
			},
			// tooltip: {
			//   x: {
			//     format: "yyyy",
			//   },
			//   fixed: {
			//     enabled: false,
			//     position: 'topRight'
			//   }
			// },
		}
	}


	else if (flag === 'linebar') {
		var series = [{
			type: 'column',
			data: weight,
			name: 'weight'
		}, {
			type: 'line',
			data: weight,
			name: 'weight'
		}]



		var options = {
			chart: {
				height: 350,
				type: 'line',
				dropShadow: {
					enabled: true,
					color: '#fff',
					top: 0,
					left: 0,
					blur: 3,
					opacity: 0.1
				}
			},
			fill: {
				opacity: 2,
				type: 'solid',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
				show: true,
				width: 4,
				colors: [0, '#4dff4d']
			},

			grid: {
				yaxis: {
					lines: {
						offsetX: -30
					}
				},
				padding: {
					left: 20
				}
			},
			labels: name,
			xaxis: {
				type: ''
			},
			yaxis: [{
				title: {
					text: '',
				},
			}]
		}
	}


	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.[rd.caption]", columnName: "rd.caption", columnID: "rd.caption", componentName: "Sales Aging Wise", filterKey: "strSaleAging", chartId: 16 }, replace: true })
	}


	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconSalesAging").style.display === "block" ? document.getElementById("myDropdowniconSalesAging").style.display = "none" : document.getElementById("myDropdowniconSalesAging").style.display = "block";
	}

	document.getElementById("root").addEventListener("click", function (event) {
		if (event.target.className !== 'dropbtn') {
			if (document.getElementById("myDropdowniconSalesAging") !== null) {
				document.getElementById("myDropdowniconSalesAging").style.display = "none"
			}
		}
	});

	async function fetchOption() {
		await post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {

							post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
								.then((res) => {
									setOptionId(res.data.lstResult[0].ChartOptionID)
								})
							alert(res.data.Message)
						})

				}
				else {
					setOptionId(res.data.lstResult[0].ChartOptionID)
					setflag(res.data.lstResult[0].ChartOption)
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconSalesAging').style.display = 'none'
				alert(res.data.Message)

			})
	}



	return (
		<div class="col-lg-6 col-md-6 col-12">
			<div class="graph-card">
				<div class="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i class="fas fa-chart-line"></i>
							Sales Aging Wise</p>
					</div>

					< div className="col-sm-2 col-md-2 col-2">
						<div className='btnicons'>
							<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

							<div id="myDropdowniconSalesAging" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'line' ? <><a id='line' className='line' >line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='line' className='line' >line </a><hr className='custom-hr' /></>}
								{flag === 'area' ? <><a id='area' className='area'>area chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='area' className='area'>area chart</a><hr className='custom-hr' /></>}
								{flag === 'linebar' ? <><a id='linebar' className='line'>Combo chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='linebar' className='line'>Combo chart</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}

					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownSalesaging" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
          </div> */}
				</div>
				{/* {weight.length !== 0 ?
					<div class="crancy-progress-card card-contain-graph">

						<ReactApexChart options={options} series={series} height={390} />
					</div> : <div className="crancy-progress-card card-contain-graph">
						<div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
						</div>
					</div>} */}
				{dataloader !== true ?
					loader !== true ?
						<div class="crancy-progress-card card-contain-graph">

							<ReactApexChart options={options} series={series} height={390} />
						</div> :
						<div className="crancy-progress-card card-contain-graph"  >
							Not Found
						</div>
					:
					<div className="crancy-progress-card card-contain-graph">
						<div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}
