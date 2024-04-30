import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { YearWise_Donut } from '../../ChartOptions/YearWise_Donut';
import { YearWise_bar } from '../../ChartOptions/YearWise_bar';
import { YearWise_semiDonut } from '../../ChartOptions/YearWise_semiDonut';
import { useNavigate } from 'react-router-dom';



export default function YearWise() {

	const navigate = useNavigate()

	// const contexData = useContext(contex)

	// const series = [
	// 	{
	// 		name: 'Actual',
	// 		data: [
	// 			{
	// 				x: '2011',
	// 				y: 1292,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 1400,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2012',
	// 				y: 4432,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 5400,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2013',
	// 				y: 5423,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 5200,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2014',
	// 				y: 6653,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 6500,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2015',
	// 				y: 8133,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 6600,
	// 						strokeHeight: 13,
	// 						strokeWidth: 0,
	// 						strokeLineCap: 'round',
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2016',
	// 				y: 7132,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 7500,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2017',
	// 				y: 7332,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 8700,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2018',
	// 				y: 6553,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 7300,
	// 						strokeHeight: 2,
	// 						strokeDashArray: 2,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			}
	// 		]
	// 	}
	// ]
	// const option = barMarkerOptions()

	// const [postData, setPostData] = useState({
	// 	"strBranch": "",
	// 	"strState": "",
	// 	"strCity": "",
	// 	"strItem": "",
	// 	"strSubItem": "",
	// 	"strItemGroup": "",
	// 	"strItemSubitem": "",
	// 	"strPurchaseParty": "",
	// 	"strSalesParty": "",
	// 	"strSaleman": "",
	// 	"strProduct": "",
	// 	"strDesignCatalogue": "",
	// 	"strSaleAging": "",
	// 	"strModeofSale": "",
	// 	"strTeamModeofSale": "",
	// 	"FromDate": "",
	// 	"ToDate": "",
	// 	"strMetalType": "",
	// 	"strDayBook": "",
	// 	"PageNo": 0,
	// 	"PageSize": 0,
	// 	"Search": ""
	// })


	// useEffect(()=>{

	// 	setPostData(contexData.state)

	// },[contexData.state])

	// useEffect(()=>{

	// 	getdata()

	// },[postData])


	// function getdata() {

	// 	let temp1 = []

	// 	post(postData, API.GetYearWise, 'post')
	// 		.then((res) => {

	// 			for (let index = 0; index < res.data.lstResult.length; index++) {

	// 				temp1.push({

	// 				})

	// 			}

	// 		})
	// }

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownYear").style.display === "block" ? document.getElementById("myDropdownYear").style.display = "none" : document.getElementById("myDropdownYear").style.display = "block";
	// }


	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }


	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [optionId, setOptionId] = useState()
	const [flag, setflag] = useState()
	const ChartType = "kpi"
	const [flagSort, setflagSort] = useState('')
	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
			console.log('Updationg option')
			setflag(e.target.id)
		}
		else {
			console.log("NOT UPDATING OPTIOJN")
		}

	}
	const options_bar = YearWise_bar(name, inputdata['column'])
	const options_donut = YearWise_Donut(name, inputdata['column'])
	const options_semidonut = YearWise_semiDonut(name, inputdata['column'])
	const series1 = [{
		name: 'weight',
		data: weight
	}]
	const series2 = weight

	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])

	useEffect(() => {
		if (flagSort !== '') {
			fetchSortData()
		}
	}, [flagSort])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'M.FinYearID,m.YearCode', ['SortByLabel']: 'YearCode' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['YearCode'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['YearCode'])
					}
					weight.push(res.data.lstResult[index][inputdata['column']])
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






	if (flag === 'bar') {
		var series = [{
			data: weight
		}]

		var options = {
			chart: {
				height: 350,
				type: 'bar'
			},
			plotOptions: {
				bar: {
					columnWidth: '60%'
				}
			},
			xaxis: {
				categories: name,
			},
			colors: ['#00E396'],
			dataLabels: {
				enabled: false
			},
			legend: {
				show: false
			}
		}
	}

	else if (flag === 'donut') {
		var series = weight

		var options = {
			dataLabels: {
				enabled: false,
			},
			chart: {
				type: 'donut',
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 1000,
					animateGradually: {
						enabled: true,
						delay: 150
					},
					dynamicAnimation: {
						enabled: true,
						speed: 1000
					}
				},
			},
			plotOptions: {
				pie: {
					startAngle: -90,
					endAngle: 90,
					offsetY: 80,
					dataLabels: {
						format: 'scale'
					}
				}
			},
			colors: ['#58a3b2'],

			legend: {
				show: false,
				floating: true,
				fontSize: '13px',
				position: 'left',
				offsetX: 140,
				offsetY: 3,
				labels: {
					useSeriesColors: true,
				},
				markers: {
					width: 0,
					height: 0
				},

			},

			labels: name,
			// tooltip: {
			// 	theme: 'dark',
			// 	x: {
			// 		show: true
			// 	},
			// 	y: {
			// 		show: true
			// 	}
			// },
			// responsive: [{
			//   breakpoint: 480,
			//   options: {
			// 	chart: {
			// 	  width: 200
			// 	},
			// 	legend: {
			// 	  position: 'bottom'

			// 	}
			//   }
			// }]
		}
	}

	else if (flag === 'kpi') {
		var series = weight

		var options = {
			dataLabels: {
				enabled: true,
			},
			tooltip: {
				enabled: true,
				followCursor: true,
			},
			colors: ['#51bde4'],

			chart: {
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 1000,
					animateGradually: {
						enabled: true,
						delay: 150
					},
					dynamicAnimation: {
						enabled: true,
						speed: 1000
					}
				},
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

			plotOptions: {
				pie: {
					startAngle: 0,
					endAngle: 360,
					customScale: 0.9,
					offsetY: 20,
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

							},
							value: {

							}
						}
					}
				}
			}
		}
	}


	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconyear").style.display === "block" ? document.getElementById("myDropdowniconyear").style.display = "none" : document.getElementById("myDropdowniconyear").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				console.log(document.getElementsByClassName('dropdown-contenticon'), 'tag');
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconyear') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "M.FinYearID,m.YearCode", columnName: "YearCode", columnID: "FinYearID", componentName: "Year Wise", chartId: 15 }, replace: true })
	}

	document.getElementById("root").addEventListener("click", function (event) {
		console.log(event.target, "class");
		if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconyear") !== null) {
				document.getElementById("myDropdowniconyear").style.display = "none"
				document.getElementById("sorticonYear").style.display = "none"
			}
		}

	});
	async function fetchOption() {
		await post({ "ID": 15, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 15, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {

							post({ "ID": 15, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 15, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconyear').style.display = 'none'
				alert(res.data.Message)

			})
	}

	function handleSorting() {
		document.getElementById("sorticonYear").style.display === "block" ? document.getElementById("sorticonYear").style.display = "none" : document.getElementById("sorticonYear").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		// console.log(tag_array);
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonYear') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonYear' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'YearCode', 'SortBy': flagSort, ['Grouping']: 'M.FinYearID,m.YearCode' }
		console.log(inputForSort);
		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];
			// console.log(res.data.lstResult)
			for (let index = 0; index < res.data.lstResult.length; index++) {
				if (res.data.lstResult[index]['YearCode'] === null) {
					name.push("null")
				} else {
					name.push(res.data.lstResult[index]['YearCode'])
				}
				weight.push(res.data.lstResult[index][inputdata['column']])
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


	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i className="fas fa-calendar-alt"></i> Year Wise</p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

						<div id="sorticonYear" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Year ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Year ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Year DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Year DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
						<div className='btnicons'>
							<div id="myDropdowniconyear" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'semiDonut' ? <><a id='semiDonut' className='semiDonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semiDonut' className='semiDonut'>Semi Donut</a><hr className='custom-hr' /></>}

								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
								{/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
							</div>
						</div>
					</div>
					{/* <i className="fas fa-external-link-alt"></i> */}
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownYear" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}
				</div>
				{/* {weight.length !== 0 ?
					<div className="crancy-progress-card card-contain-graph">
						{flag === 'donut' ? <ReactApexChart options={options_donut} series={series2} type='donut' height={350} /> : null}
						{flag === 'bar' ? <ReactApexChart options={options_bar} series={series1} type={flag} height={350} /> : null}
						{flag === 'semiDonut' ? <ReactApexChart options={options_semidonut} series={series2} type='donut' height={350} /> : null}
					</div> :
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
					</div>} */}
				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">
							{flag === 'donut' ? <ReactApexChart options={options_donut} series={series2} type='donut' height={350} /> : null}
							{flag === 'bar' ? <ReactApexChart options={options_bar} series={series1} type={flag} height={350} /> : null}
							{flag === 'semiDonut' ? <ReactApexChart options={options_semidonut} series={series2} type='donut' height={350} /> : null}
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
