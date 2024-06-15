
import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from '../MinimumStocksComponents/MinimumStockChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import StockToSalesOption from '../../ChartOptions/StockToSales/StockToSalesOption';
import ReactApexChart from 'react-apexcharts';

export default function MinimumStockDefaultChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailsecondstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [data, setdata] = useState([]);
    let updatedstate = {}
    let option = {};


    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd", props.state.ChartMode);
    }, [props])

    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd1sdsd1", inputdata);
    }, [inputdata])

    useEffect(() => {
        fetchPaginatedData(data[0])
    }, [data])

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, 'FromDate' : props.state.FromDate, 'ToDate' : props.state.ToDate }
        console.log(inputdata,'sed123');
        
        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                let templength = res.data.lstResult.length
                let mainlist = [];
                let childlist = [];
                console.log(templength, "length");
                childlist.push(res.data.lstResult[0])
                for (let i = 1; i <= parseInt(templength / 5) + 1; i++) {
                    if (((i) * 5) < res.data.lstResult.length) {
                        for (let index = (i - 1) * 5 + 1; index <= i * 5; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    } else {
                        console.log("hahahah", (i - 1) * 5 + 1, templength - (parseInt(templength / 5) * 5));
                        for (let index = (i - 1) * 5 + 1; index < templength; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    }
                    console.log(childlist, 'list');
                    mainlist.push(childlist)
                    console.log(mainlist, 'list');

                    childlist = [];
                }
                setdata(mainlist)
                setdataLoader(false)
                if (mainlist.length !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        })
    }

    function fetchPaginatedData(data1) {
        console.log(data, data1);
        if (data1 !== undefined && data1.indexOf(undefined) === -1) {
            if (data.length > 0 && data1.length > 0) {
                var tempYaxis = [];
                for (let i = 0; i < MinimumStockChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < data1.length; j++) {
                        tempYaxis1.push(data1[j][MinimumStockChartObject[props.state.ChartMode]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);

                let idtemp = [];
                let tempXaxis = [];
                for (let j = 0; j < data1.length; j++) {
                    tempXaxis.push(data1[j][MinimumStockChartObject[props.state.ChartMode]['xAxis']]);
                    idtemp.push(data1[j][MinimumStockChartObject[props.state.ChartMode]['id']])
                }
                setxAxis(tempXaxis);
                console.log(idtemp, "sasa");
                setid(idtemp);
            }
        }
    }

    function handleMonthOptionClick(label) {
        contextData.SetDetailState({ ...contextData.detailstate, ['MonthType']: label })
    }

    function handleRightClick() {
        if (data.length > page + 1) {
            setPage(page + 1);
            fetchPaginatedData(data[page + 1])
        }
    }

    function handleLeftClick() {
        if (0 < page) {
            setPage(page - 1);
            fetchPaginatedData(data[page - 1])
        }
    }


    return (
        <div class="col-xl-6 col-lg-6 col-md-12 col-12">
            <div>
                <div class="title-top-graphdetail">
                    <h5>
                        {props.state !== null ? props.state.componentName : null} <span style={{fontSize:'15px'}}> {contextData.filtername !== ""? "( " + contextData.filtername + " )": null}</span>
                    </h5>
                </div>
                {dataloader !== true ?
                    loader !== true ?
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div className="detailstocktosales" style={props.state.dropdown === '1' ?{ height: '395px' }:{height: '350px'}} >

                                        {console.log(props.state, "ssss")}
                                        <ReactApexChart options={StockToSalesOption(xAxis, yAxis, id, contextData, props.state.filterkey, 2)[0]} series={StockToSalesOption(xAxis, yAxis, id, contextData, props.state.filterkey, 2)[1]} type='line' height={props.state.dropdown === '1' ?340:300} />
                                        <div className='mainscreenchartdiv'>
                                            <button onClick={handleLeftClick} className='chartupdown left'><i class="fa-solid fa-left-long iconupdown"></i></button>

                                            <button onClick={handleRightClick} className='chartupdown right'><i class="fa-solid fa-right-long iconupdown"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div class="" style={props.state.dropdown === '1' ?{ height: '395px', color: 'black' }:{ height: '350px', color: 'black' }}>

                                        Not Found
                                    </div>
                                </div>
                            </div>
                        </div> :
                    <div class="flip-card">
                        <div class="flip-card-inner" id='filp'>
                            <div class="flip-card-back">
                                <div class="" style={props.state.dropdown === '1' ?{ height: '395px' }:{height: '350px'}}>
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
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}