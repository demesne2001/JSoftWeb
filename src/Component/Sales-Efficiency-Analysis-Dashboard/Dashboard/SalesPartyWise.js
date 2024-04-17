import React, { useContext, useEffect, useState } from 'react'
import Gradient from "javascript-color-gradient";
import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import post from '../../Utility/APIHandle'
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import { SalesPartyWiseLolipop } from '../../ChartOptions/SalesPartyWiseLolipop';
import { SalesPartyWise_bar } from '../../ChartOptions/SalesPartyWise_bar';
import { useNavigate } from 'react-router-dom';

import '../../Assets/css/Custom.css'

export default function SalesPartyWise() {

	// const contexData = useContext(contex)

	// const [sales, setSales] = useState([
	// 	{ product: 'Black Watch', thisYearProfit: 312122, color: "" },
	// 	{ product: 'Gaming Set', thisYearProfit: 296232, color: "" },
	// 	{ product: 'Brown Purse', thisYearProfit: 500332, color: "" },
	// 	{ product: 'Bamboo Watch', thisYearProfit: 43342, color: "" },
	// 	{ product: 'Blue Band', thisYearProfit: 8500, color: "" },
	// 	{ product: 'Blue T-Shirt', thisYearProfit: 65323, color: "" },
	// 	{ product: 'Chakra Bracelet', thisYearProfit: 150005, color: "" },
	// 	{ product: 'Galaxy Earrings', thisYearProfit: 100214, color: "" },
	// 	{ product: 'Game Controller', thisYearProfit: 53322, color: "" },
	// 	{ product: 'Gold Phone Case', thisYearProfit: 12533, color: "" }
	// ]);

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	// const [postData, setPostData] = useState({
	//     "strBranch": "",
	//     "strState": "",
	//     "strCity": "",
	//     "strItem": "",
	//     "strSubItem": "",
	//     "strItemGroup": "",
	//     "strItemSubitem": "",
	//     "strPurchaseParty": "",
	//     "strSalesParty": "",
	//     "strSaleman": "",
	//     "strProduct": "",
	//     "strDesignCatalogue": "",
	//     "strSaleAging": "",
	//     "strModeofSale": "",
	//     "strTeamModeofSale": "",
	//     "FromDate": "",
	//     "ToDate": "",
	//     "strMetalType": "",
	//     "strDayBook": "",
	//     "PageNo": 0,
	//     "PageSize": 0,
	//     "Search": ""
	// })

	// useEffect(()=>{

	// 	setPostData(contexData.state)

	// },[contexData.state])

	// useEffect(()=>{
	// 	getdata()
	// 	gradientdata()
	// },[postData])
	const contexData = useContext(contex);
	// const [name, setName] = useState([])
	// const [weight, setweight] = useState([])
	const [sales, setSales] = useState([])
	let inputdata = contexData.state;

	const [name, setName] = useState([])
	const [weight, setweight] = useState([])

	const [flag, setflag] = useState()
	const ChartType = "bar"
	const [demo, setdemo] = useState("bar")
	const [optionId, setOptionId] = useState()

	const navigate = useNavigate()

	const options_lolipop = SalesPartyWiseLolipop(name)
	const options_bar = SalesPartyWise_bar(name)
	const series = [{
		name: 'Weight',
		data: weight
	}]

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '' ) {
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
	// useEffect(() => {
	// 	gradientdata()
	// }, [sales])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.accountID,c.AccountName' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let sale = [];
				var js = {};
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['AccountName'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['AccountName'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])


					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['AccountName'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['AccountName']
					}
					js['thisYearProfit'] = res.data.lstResult[index]['FineWt']

					sale.push(js)

				}
				// setSales(sale)
				var j = []
				for (let index = 0; index < sale.length; index++) {
					j.push({ ...sale[index], ['color']: gradientArray[index] })
				}

				setName(name)
				setweight(weight)
				setSales(j)
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}

	// console.log('sales', sales)

	// function gradientdata() {
	// 	var j = []
	// 	for (let index = 0; index < sales.length; index++) {
	// 		j.push({ ...sales[index], ['color']: gradientArray[index] })
	// 	}
	// 	setSales(j)
	// }



	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconSalesparty").style.display === "block" ? document.getElementById("myDropdowniconSalesparty").style.display = "none" : document.getElementById("myDropdowniconSalesparty").style.display = "block";
	}

	window.onclick = function (event) {

		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-contenticon")[9] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[9].style.display = "none";
			}

		}
	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.accountID,c.AccountName", columnName: "AccountName", columnID: "accountID", componentName: "Sales Party Wise", filterKey: "strSalesParty",chartId : 10 } })
	}

	async function fetchOption() {
		await post({ "ID": 10, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 10, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {

							post({ "ID": 10, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconSalesparty').style.display = 'none'
				alert(res.data.Message)

			})
	}


	return (

		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i className="fas fa-handshake"></i>
							Sales Party Wise</p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						<div className='btnicons'>
							<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

							<div id="myDropdowniconSalesparty" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap' className='heatmap'>Heat map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' className='heatmap'>Heat map</a><hr className='custom-hr' /></>}
								{/* {flag === 'barl' ? <><a id='barl' className='bar'>lollipop chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barl' className='bar'>lollipop chart</a><hr className='custom-hr' /></>} */}

								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
								{/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
							</div>
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>

					{/* <i className="fas fa-external-link-alt"></i> */}
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownSales" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
					</div> */}
				</div>
				<div className="crancy-progress-card card-contain-graph">
					{flag === 'bar'
						?
						<ReactApexChart options={options_bar} series={series} type={demo} height={350} />
						: null}
					{flag === 'barl'
						?
						<ReactApexChart options={options_lolipop} series={series} type={demo} height={350} />
						: null}
					{flag === 'heatmap' ?
						<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
							<tr>
								<th>AccountName</th>
								<th>FineWt</th>
							</tr>


							{sales.map((data) => {
								return (
									<tr >
										<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.product} </td>
										<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.thisYearProfit}</td>
									</tr>
								)
							})}

						</table> : null}
				</div>
			</div>
		</div>
	)
}
