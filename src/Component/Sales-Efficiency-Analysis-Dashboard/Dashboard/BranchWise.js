import React, { useEffect, useState, useRef, useContext } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import Gradient from "javascript-color-gradient";
import { BranchWise_donut } from "./../../ChartOptions/BranchWise_donut";
import { BranchWise_Radial } from "./../../ChartOptions/Branchwise_Radial";
import { render } from '@testing-library/react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { Axios } from 'axios';
import Notify from '../Notification/Notify';

export default function BranchWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex)
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [flag, setflag] = useState()
	const [flagSort, setflagSort] = useState('')
	let column = inputdata['column'];
	// const [, setflag] = useState()
	const [optionId, setOptionId] = useState()
	const [sales, setSales] = useState([])
	const ChartType = "donut"
	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
	useEffect(() => {
		document.getElementById("downloadExcel").style.pointerEvents = "none";
		document.getElementById("downloadExcel").style.color = "#7ca6c7";
		fetchOption()

		getdata()

	}, [inputdata])

	useEffect(() => {
		if (flagSort !== '') {
			fetchSortData()
		}
	}, [flagSort])


	const series = handleSeriesData()
	const series_donut = weight
	const options_donut = BranchWise_donut(name, inputdata['column'])

	const options_radialbar = BranchWise_Radial(name, inputdata['column'])

	function handleclick(e) {



		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

		}

	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}

	function handleSeriesData() {
		let percarray = []
		let sum = 0;

		if (column === 'NetWeight') {
			for (let i = 0; i < weight.length; i++) {
				sum += weight[i];
			}

			for (let index = 0; index < weight.length; index++) {
				percarray.push((weight[index] / sum) * 100)
			}
			return percarray
		} else {
			return weight
		}

	}


	async function getdata() {
		inputdata = { ...inputdata, ['Grouping']: 'a.BranchID,b.BranchName', ['SortByLabel']: 'BranchName' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name1 = [];
				let weight1 = [];
				let sale = [];
				var js = {};

				for (let index = 0; index < res.data.lstResult.length; index++) {
					name1.push(res.data.lstResult[index]['BranchName'])
					weight1.push(res.data.lstResult[index][inputdata['column']])

					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['BranchName'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['BranchName']
					}
					js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

					sale.push(js)
				}
				setName(name1)
				setweight(weight1)
				setdataLoader(false)
				if (weight1.length !== 0) {
					setLoader(false)
				} else {
					setLoader(true)
				}
				var j = []
				for (let index = 0; index < sale.length; index++) {
					j.push({ ...sale[index], ['color']: gradientArray[index] })
				}
				setSales(j)


				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}

	async function fetchOption() {
		await post({ "ID": 1, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)

					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 1, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 1, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
								.then((res) => {
									setOptionId(res.data.lstResult[0].ChartOptionID)
								})

							Notify()
						})

				}
				else {

					setOptionId(res.data.lstResult[0].ChartOptionID)
					setflag(res.data.lstResult[0].ChartOption)
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 1, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {

				document.getElementById('myDropdowniconbranch').style.display = 'none'
				Notify()
			})
	}

	function handleonchangeCurrency() {
		document.getElementById("myDropdowniconbranch").style.display === "block" ? document.getElementById("myDropdowniconbranch").style.display = "none" : document.getElementById("myDropdowniconbranch").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconbranch') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.BranchID,b.BranchName", columnID: 'BranchID', columnName: 'BranchName', componentName: "Branch Wise", filterKey: "strBranch", chartId: 1 }, replace: true })
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconbranch") !== null) {
				document.getElementById("myDropdowniconbranch").style.display = "none"
				document.getElementById("sorticonbranch").style.display = "none"
			}
		}

	});


	function handleSorting() {
		document.getElementById("sorticonbranch").style.display === "block" ? document.getElementById("sorticonbranch").style.display = "none" : document.getElementById("sorticonbranch").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonbranch') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonbranch' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'BranchName', 'SortBy': flagSort, ['Grouping']: 'a.BranchID,b.BranchName' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name2 = [];
			let weight2 = [];
			let sale = [];
			var js = {};

			for (let index = 0; index < res.data.lstResult.length; index++) {
				name2.push(res.data.lstResult[index]['BranchName'])
				weight2.push(res.data.lstResult[index][inputdata['column']])

				js = { 'product': '', 'thisYearProfit': 0 }
				if (res.data.lstResult[index]['BranchName'] === null) {
					js['product'] = 'null'
				} else {
					js['product'] = res.data.lstResult[index]['BranchName']
				}
				js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

				sale.push(js)
			}
			setName(name2)
			setweight(weight2)

			setdataLoader(false)
			if (weight2.length !== 0) {
				setLoader(false)
			} else {
				setLoader(true)
			}
			var j = []
			for (let index = 0; index < sale.length; index++) {
				j.push({ ...sale[index], ['color']: gradientArray[index] })
			}
			setSales(j)


			inputdata = { ...inputdata, ['Grouping']: '' }
		})
	}

	return (
		<div className="col-lg-4 col-md-6 col-12">

			<div className="graph-card">
				<div className='card-title-graph'>

					<div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleNavigation} >

						<p><i class="fas fa-chart-pie"></i> Branch Wise</p>

					</div>

					<div className="col-xs-4 col-sm-2 col-md-2 col-2" >
						<div className='d-flex '>
							<div className='dropbtngraph'>
								<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
							</div>
							<div className='dropbtngraph'>
								<i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
							</div>
						</div>
						<div id="sorticonbranch" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Branch ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Branch ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Branch DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Branch DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<div className='btnicons'>
							<div id="myDropdowniconbranch" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'donut' ? <><a id='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar'>RadialBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' >RadialBar</a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap'>Heat map&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='heatmap' >Heat map</a><hr className='custom-hr' /> </>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

							</div>
						</div>

					</div>

				</div>
				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph" id='flipbranch'>

							{flag === 'donut' ? <ReactApexChart options={options_donut} series={series_donut} height={380} type={flag} /> : null}
							{flag === 'radialBar' ? <ReactApexChart options={options_radialbar} series={series} height={380} type={flag} /> : null}
							{flag === 'heatmap' ?
								<div>
									<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
										<tr>
											<th>Branchwise</th>
											<th>NetWeight</th>
										</tr>
										{sales.map((data) => {
											return (
												<tr >
													<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.product} </td>
													<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.thisYearProfit}</td>
												</tr>
											)
										})}

									</table></div> : null}
							{/* </div> */}
							<div id="html-dist"></div>
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
