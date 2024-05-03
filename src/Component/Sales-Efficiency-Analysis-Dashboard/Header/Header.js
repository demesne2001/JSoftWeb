import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import post from "../../Utility/APIHandle";
import API from "../../Utility/API";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import contex from "../../contex/Contex";
import Commonmodel from "../../CommonModel/CommanModal";
import currency from "../../Assets/img/svg/currency.svg";
import "../../Assets/css/Custom.css";
import * as htmlToImage from 'html-to-image';
import reactSelect from "react-select";
import download from 'downloadjs';
import { MultiSelect } from "react-multi-select-component";
import { json } from "react-router-dom";



// import Commonmodel from '../../CommonModel/CommanModal';

export default function Header() {
  const [fullscreen, setFullScreen] = useState(false);
  const contexData = useContext(contex);
  const unitRef = useRef(null);
  const metaltypeRef = useRef(null);
  const DaybookRef = useRef(null);
  let FilterData = {
    ...contexData.tempstate,
    ["strBranch"]: contexData.tempstate["strBranch"],
    ["strState"]: contexData.tempstate["strState"],
    ["strCity"]: contexData.tempstate["strCity"],
    ["strItem"]: contexData.tempstate["strItem"],
    ["strSubItem"]: contexData.tempstate["strSubItem"],
    ["strItemGroup"]: contexData.tempstate["strItemGroup"],
    ["strItemSubitem"]: contexData.tempstate["strItemSubitem"],
    ["strDesignCodeID"]: contexData.tempstate["strDesignCodeID"],
    ["strSalesParty"]: contexData.tempstate["strSalesParty"],
    ["strSaleman"]: contexData.tempstate["strSaleman"],
    ["strProduct"]: contexData.tempstate["strProduct"],
    ["strDesignCatalogue"]: contexData.tempstate["strDesignCatalogue"],
    ["strSaleAging"]: contexData.tempstate["strSaleAging"],
    ["strModeofSale"]: contexData.tempstate["strModeofSale"],
    ["strTeamModeofSale"]: contexData.tempstate["strTeamModeofSale"],
    ["FromDate"]: contexData.tempstate["FromDate"],
    ["ToDate"]: contexData.tempstate["ToDate"],
    ["strMetalType"]: contexData.tempstate["strMetalType"],
    ["strDayBook"]: contexData.tempstate["strDayBook"],
    ["column"]: contexData.tempstate["column"]
  };

  const animatedComponents = makeAnimated();


  const [filterFlag, setFIlterFlag] = useState(false);


  const [file, setfile] = useState('');
  let res

  const [count, setCount] = useState(uuidv4())
  const [percentage_check, setpercentage_check] = useState(false);
  const conponentPDF = useRef(null);

  const postData = {
    strBranch: "",
    strState: "",
    strCity: "",
    strItem: "",
    strSubItem: "",
    strItemGroup: "",
    strItemSubitem: "",
    strPurchaseParty: "",
    strSalesParty: "",
    strSaleman: "",
    strProduct: "",
    strDesignCatalogue: "",
    strSaleAging: "",
    strModeofSale: "",
    strTeamModeofSale: "",
    strDesignCodeID: "",
    strRegionID: "",
    FromDate: "",
    ToDate: "",
    strMetalType: "",
    strDayBook: "",
    PageNo: 0,
    PageSize: 9999,
    Search: "",
    Grouping: "",
    FilterIndex: "",
    strBranchValue: "",
    strItemValue: "",
    strSubItemValue: "",
    strItemGroupValue: "",
    strItemSubitemValue: "",
    strPurchasePartyValue: "",
    strSalesPartyValue: "",
    strSalemanValue: "",
    strProductValue: "",
    strDesignCatalogueValue: "",
    strSaleAgingValue: "",
    strModeofSaleValue: "",
    strTeamModeofSaleValue: "",
    strRegionValue: "",
    strDayBookValue: "",
    strStateValue: '',
    strMonth: "",
    strFinYear: "",
    strMonthValue: "",
    strDesignCodeValue: "",
    column: 'NetWeight',
    Unity: "G",
    SortBy: "wt-desc",
    SortByLabel: ""
  };

  const dependentfilter = {
    1: [
      "strBranch",
      API.BranchFilter,
      "BranchId",
      "BranchName",
      "strBranchValue",
      1
    ],
    2: [
      "strRegionID",
      API.GetRegion,
      "RegionID",
      "RegionName",
      "strRegionValue",
      2
    ],
    3: ["strState", API.GetState, "StateID", "StateName", "strStateValue", 3],
    4: ["strCity", API.GetCity, "CityName", "CityName", "strCity", 4],
    5: [
      "strItemGroup",
      API.itemGroupFilter,
      "ItemGroupID",
      "ItemGroupName",
      "strItemGroupValue",
      5,
    ],
    6: [
      "strProduct",
      API.productFilter,
      "ProductId",
      "ProductName",
      "strProductValue",
      6,
    ],
    7: ["strItem", API.itemFilter, "ItemId", "ItemName", "strItemValue", 7],
    8: [
      "strSubItem",
      API.GetSubItem,
      "SubItemId",
      "SubItemName",
      "strSubItemValue",
      8,
    ],
    9: [
      "strItemSubitem",
      API.GetItemWithSubitem,
      "ItemSubID",
      "SubItemWithStyleName",
      "strItemSubitemValue",
      9,
    ],
    10: [
      "strDesignCatalogue",
      API.GetDesignCatalogue,
      "DesignCatalogID",
      "DesignNo",
      "strDesignCatalogueValue",
      10,
    ],
    11: [
      "strSaleman",
      API.GetSaleman,
      "SalesmanID",
      "SalesmanName",
      "strSalemanValue",
      11,
    ],
    12: [
      "strModeofSale",
      API.GetModeSale,
      "ChallanGenerateTypeID",
      "ChallanGenerateType",
      "strModeofSaleValue",
      12,
    ],
    13: [
      "strTeamModeofSale",
      API.GetTeamModeofSale,
      "TeamModeofSaleID",
      "TeamModeofSaleName",
      "strTeamModeofSaleValue",
      13,
    ],
    14: [
      "strSaleAging",
      API.GetSalesAging,
      "Caption",
      "Caption",
      "strSaleAging",
      14,
    ],
    15: [
      "strDesignCodeID",
      API.Getdesigncode,
      "designcodeID",
      "DesignName",
      "strDesignCodeValue",
      15,
    ],
    16: [
      "strSalesParty",
      API.GetSalesParty,
      "AccountId",
      "AccountName",
      "strSalesPartyValue",
      16,
    ],
    17: [
      "strMonth",
      API.GetMonth,
      "MonthID",
      "MonthName",
      "strMonthValue",
      17
    ]
  };
  const [demo, setDemo] = useState([]);
  const [demoName, setDemoName] = useState([]);
  const [state, setState] = useState({});
  const [branch, setBranch] = useState({});
  const [region, setRegion] = useState({});
  const [city, setCity] = useState({});
  const [itemGroup, setItemGroup] = useState({});
  const [product, setProduct] = useState({});
  const [item, setItem] = useState({});
  const [subItem, setSubItem] = useState({});
  const [itemSubitem, setItemSubItem] = useState({});
  const [design, Setdesign] = useState({});
  const [salesman, setSalesMan] = useState({});
  const [Daybook, setDayBook] = useState({});
  const [DefaultDaybook, setDefaultDayBook] = useState();
  const [MetalType, setMetalType] = useState({});
  const [DefaultMetalType, setDefaultMetalType] = useState();
  const [purchaseParty, setPurcharseParty] = useState({});
  const [salesParty, setSalesParty] = useState({});
  const [unit, setUnit] = useState([{ value: 'KG', label: 'KG' }, { value: 'G', label: 'Gram' }]);
  const [Defaultunit, setDefaultUnit] = useState({ value: 'G', label: 'Gram' });
  const [props1, setProps1] = useState();
  const [syncDate, setSyncDate] = useState()


  const date = new Date();


  useEffect(() => {
    getSyncDate()
    contexData.SettempState({ ...contexData.tempstate, ["ToDate"]: currentDate })
    handleDaybook();
    handleMetaltype();
  }, [])

  useEffect(() => {

    if (contexData.state['column'] === 'Prc') {
      setpercentage_check(true)
    } else {
      setpercentage_check(false)
    }
  }, [contexData.state['column']])

  useEffect(() => {
    // console.log(contexData.tempstate);
    var Findex = contexData.tempstate.FilterIndex
    // console.log("useEffet1");
    // console.log('index', Findex)
    if (Findex !== "undefined" && Findex !== 0) {
      for (let index = Findex + 1; index < 16; index++) {
        // console.log(index, 'indexno')
        if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
          FetchDataDependentAPI(FilterData, index)
        }
      }
      // if (Findex >= 1 && Findex < 9) {
      //   for (let index = Findex + 1; index < 10; index++) {
      //     console.log(index, 'indexno')
      //     if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
      //       FetchDataDependentAPI(FilterData, index)
      //     }
      //   }
      // }
      // else if (Findex > 9 && Findex < 13) {
      //   for (let index = Findex; index < 16; ++index) {
      //     if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
      //       FetchDataDependentAPI(FilterData, index)
      //     }
      //   }
      // }
    }
  }, [contexData.tempstate.FilterIndex])

  // console.log('TODAYS DATE',date.getDate() + date.getMonth() + 1 + date.getFullYear())

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate
  if (month < 10) {
    if (day < 10) {
      currentDate = `${year}-0${month}-0${day}`;
    }
    else {
      currentDate = `${year}-0${month}-${day}`;
    }
  }
  else {
    if (day < 10) {
      currentDate = `${year}-0${month}-0${day}`;
    }
    else {
      currentDate = `${year}-0${month}-${day}`;
    }
  }


  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }


  async function getSyncDate() {
    await post({}, API.GetDefaultScreenData, {}, 'post')
      .then((res) => {
        setSyncDate(res.data.lstResult[0].SyncDate)
      })
  }


  function FetchDataDependentAPI(input, FilterIndex) {
    // console.log("FetchDataDependentAPI", contexData.tempstate[dependentfilter[FilterIndex][4]]);
    post(input, dependentfilter[FilterIndex][1], {}, 'post').then((res) => {
      // console.log("response", res);
      // console.log("index", contexData.tempstate[dependentfilter[FilterIndex][4]])
      var TempDataID = contexData.tempstate[dependentfilter[FilterIndex][0]].split(',')
      var TempDataValue = contexData.tempstate[dependentfilter[FilterIndex][4]].split(',')
      // console.log(res, "res+header");
      if (res.data !== undefined) {
        // console.log("hii", res.data.lstResult);
        var resultID = res.data.lstResult.map(Item => Item[dependentfilter[FilterIndex][2]].toString())
        // var resultValue=res.lstResult.map(Item=>Item[dependentfilter[FilterIndex][4]])
        // console.log('TempDatabefore', TempDataID)
        // console.log('resultID', resultID)
        // console.log("contexData.tempstate before", contexData.tempstate);
        var temarrayID = []
        var temparryValue = []
        for (let index = 0; index < TempDataID.length; index++) {
          // console.log('delete before log', resultID.indexOf(TempDataID[index]), TempDataID[index])
          if (resultID.indexOf(TempDataID[index]) >= 0) {
            // console.log('delete index', TempDataID[index])
            // TempDataID.splice(TempDataID.indexOf(TempDataID[index]),1)
            // TempDataValue.splice(TempDataValue.indexOf(TempDataValue[index]),1)
            // delete TempDataID[index]
            // delete TempDataValue[index]
            temparryValue.push(TempDataValue[index])
            temarrayID.push(TempDataID[index])
          }
        }
      }

      // console.log('TempData After', temarrayID)
      // contexData.SettempState({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: temarrayID.toString(), [dependentfilter[FilterIndex][4]]: temparryValue.toString(), ['FilterIndex']: 0 })
      if (temarrayID !== undefined) {
        contexData.SettempState({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: temarrayID.toString(), [dependentfilter[FilterIndex][4]]: temparryValue.toString(), ['FilterIndex']: 0 })
      } else {
        contexData.SettempState({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: '', [dependentfilter[FilterIndex][4]]: '', ['FilterIndex']: 0 })
      }
      // console.log("contexData.tempstate After ", contexData.tempstate);

    })
  }




  function HandleOnClickComman(IndexNo) {
    let myvalue = contexData.tempstate[dependentfilter[IndexNo][0]];
    let myvalueName = contexData.tempstate[dependentfilter[IndexNo][4]];
    // console.log("myval", myvalue);
    let demoo = [];
    let demooName = [];
    demoo.push(myvalue.split(","));
    demooName.push(myvalueName.split(","));
    // console.log("DEMOOOOO", demoo[0].length);
    let newarr = [];
    let newarrName = [];

    if (
      dependentfilter[IndexNo][0] !== "strCity" && dependentfilter[IndexNo][0] !== "strSaleAging"
    ) {
      for (let index = 0; index < demoo[0].length; index++) {
        if (demoo[0].indexOf("") === -1) {
          // console.log(demoo[0][index]);
          newarr.push(parseInt(demoo[0][index]));
          newarrName.push(demooName[0][index]);
        }
      }
    } else {

      for (let index = 0; index < demoo[0].length; index++) {
        if (demoo[0].indexOf("") === -1) {
          // console.log(demoo[0][index]);
          newarr.push(demoo[0][index]);
          newarrName.push(demooName[0][index]);
        }
      }
    }
    setDemo(newarr);
    setDemoName(newarrName);
    // console.log(newarr);
    setProps1({
      api: dependentfilter[IndexNo][1],
      labelname: dependentfilter[IndexNo][0],
      id: dependentfilter[IndexNo][2],
      name: dependentfilter[IndexNo][3],
      LabelValue: dependentfilter[IndexNo][4],
      FilterIndex: IndexNo,
      grid: dependentfilter[IndexNo][5]
    });
    contexData.setchildFilterShow(true);
  }



  function handlerOnOpen() {
    setFIlterFlag(true);
  }

  function handleOnClose() {
    setFIlterFlag(false);
  }

  function Handlefullscreen() {
    if (fullscreen === true) {
      setFullScreen(false);
      document.exitFullscreen();
    } else {
      setFullScreen(true);
      var ele = document.documentElement;
      ele.requestFullscreen();
    }
  }

  function getdataState() {
    let temp1 = [];

    // console.log('branch postdata' ,postData)

    post(postData, API.stateFilter, {}, "post").then((res) => {
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          value: res.data.lstResult[index].StateID,
          label: res.data.lstResult[index].StateName,
        });
      }
      setState(temp1);
    });
  }

  function handleMetaltype() {
    let temp1 = [];

    post(postData, API.GetMetalType, {}, "post").then((res) => {
      // console.log(res.data.lstResult, "api");
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          label: res.data.lstResult[index].MetalTypeDesc,
          value: res.data.lstResult[index].MetalType,
        });
      }
      setMetalType(temp1);
    });
  }

  function handleDaybook() {
    let temp1 = [];

    post(postData, API.GetDayBook, {}, "post").then((res) => {
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          value: (res.data.lstResult[index].DayBookID).toString(),
          label: res.data.lstResult[index].Daybook,
        });
      }
      // console.log(res, "getDaybook");
      setDayBook(temp1);
    });
  }
  function handleselect(e, selectData) {

    if (selectData.name === 'MetalTypeSelect') {
      if (e.length !== 0) {
        var name = [];
        var val = [];
        setDefaultMetalType(e);
        for (let i = 0; i < e.length; i++) {
          name.push(e[i]['label'])
          val.push(e[i]['value'])
        }
        contexData.SettempState({ ...contexData.tempstate, ['strMetalType']: val.toString(), ['strMetalTypeValue']: name.toString() });
      } else {
        // contexData.SettempState({ ...contexData.tempstate, ['strMetalType']: '', ['strMetalTypeValue']: '' });
        setDefaultMetalType([])
      }
      // console.log(e, "DATA12");
    } else {
      // console.log(e, "DATA13");
      if (e.length !== 0) {
        setDefaultDayBook(e);
        var name = [];
        var val = [];
        for (let i = 0; i < e.length; i++) {
          name.push(e[i]['label'])
          val.push(e[i]['value'])
        }
        contexData.SettempState({ ...contexData.tempstate, ['strDayBook']: val.toString(), ['strDayBookValue']: name.toString() });
      } else {
        // contexData.SettempState({ ...contexData.tempstate, ['strDayBook']: '', ['strDayBookValue']: '' });
        setDefaultDayBook([])
      }
    }
  }



  function handleonchange(e) {
    contexData.SettempState({ ...contexData.tempstate, [e.target.name]: e.target.value });
  }

  async function downloadPdfDocument() {
    var nameArray = []
    document.getElementById("downloadPdf").disabled = true

    document.getElementById('pdf-div').style.display = "block";

    await htmlToImage.toPng(document.getElementById('rootElementId'))

      .then(function (dataUrl) {
        // console.log(dataUrl);
        setCount(count + 1)

        var name = count.toString() + "Dashboard";
        // console.log(API.uploadImage, "name123");
        // console.log('dataUrl', { "Base64": dataUrl, "Extension": "png", "LoginID": name })
        // download(dataUrl, "file1.png")
        post({ "Base64": dataUrl, "Extension": "png", "LoginID": name }, API.uploadImage, {}, "post").then((res) => {
          // console.log(res, "respdf");
          nameArray.push(res.data.filename);
        })
      });

    await htmlToImage.toPng(document.getElementById('pdf-div'))
      .then(function (dataUrl) {
        var name = count.toString() + "filter";
        // download(dataUrl, "file2.png")
        // console.log('dataUrl1', dataUrl)
        post({ "Base64": dataUrl, "Extension": "png", "LoginID": name }, API.uploadImage, {}, "post").then((res) => {
          // console.log(res.data.filename);
          nameArray.push(res.data.filename);
          // console.log({ "ImageLst": [count.toString() + "filter.png", count.toString() + "Dashboard.png"], "FileName": count.toString() + "aa" }, "input");
          post({ "ImageLst": [count.toString() + "filter.png", count.toString() + "Dashboard.png"], "FileName": count.toString() + "aa" }, 'http://103.131.196.61:52202/Common/GetPDFUsingImage', {}, "post").then((res) => {
            // download("http://192.168.1.208:7000/PDF/5aa.pdf", "dash", "pdf")
            // console.log(res);
            // const pdfUrl = "http://192.168.1.208:7000/PDF/" + count.toString() + "aa.pdf";
            // console.log(count,"count pdf");
            const pdfUrl = API.downloadPdf + count.toString() + "aa.pdf";
            axios.get(pdfUrl, {
              responseType: 'blob',
            })
              .then((res) => {
                download(res.data, "JSoftDashboard.pdf")
                document.getElementById("downloadPdf").disabled = false
              })
              .catch((e) => {
                // console.log(e)
                document.getElementById("downloadPdf").disabled = false
              })

          });
        })
      });


    setTimeout(() => {
      document.getElementById('pdf-div').style.display = "none";
    }, 100);
  }

  function handleApplyFilter() {
    if (JSON.stringify(contexData.state) !== JSON.stringify(FilterData)) {
      // console.log('FILTER DATA', FilterData)
      contexData.SetState(FilterData);
      handleOnClose();
    }
    else {
      handleOnClose();
    }
    // contexData.SetState(FilterData);
    // handleOnClose();
  }

  function handleDesignCommanModal() {
    let myvalue = contexData.tempstate["strItemSubitem"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetItemWithSubitem,
      labelname: "strItemSubitem",
      id: "ItemSubID",
      name: "SubItemWithStyleName",
    });
    contexData.setchildFilterShow(true);
  }

  function handlePurchaseCommanModal() {
    let myvalue = contexData.tempstate["strDesignCodeID"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.Getdesigncode,
      labelname: "strDesignCodeID",
      id: "DesignCatalogID",
      name: "DesignNo",
    });
    contexData.setchildFilterShow(true);
  }

  function handleSalesCommanModal() {
    let myvalue = contexData.tempstate["strSalesParty"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetSalesParty,
      labelname: "strSalesParty",
      id: "AccountId",
      name: "AccountName",
    });
    contexData.setchildFilterShow(true);
  }

  function handleDesignCatalogueCommanModal() {
    let myvalue = contexData.tempstate["strDesignCatalogue"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetDesignCatalogue,
      labelname: "strDesignCatalogue",
      id: "DesignCatalogID",
      name: "DesignNo",
    });
    contexData.setchildFilterShow(true);
  }

  function handleThousand(n) {
    localStorage.setItem("value", n);
    contexData.setcurrency(n);
  }
  function handleonchangeCurrency() {
    document.getElementById("myDropdown").style.display === "block"
      ? (document.getElementById("myDropdown").style.display = "none")
      : (document.getElementById("myDropdown").style.display = "block");
  }

  // window.onclick = function (event) {
  //   console.log(document.getElementsByClassName("dropdown-content")[0]);
  //   if (event.target.className === "dropbtn") {
  //     document.getElementsByClassName("dropdown-content")[0].style.display = "none";
  //   }
  // };

  function formatedValue(str) {
    if (str !== undefined) {
      if (str === '' || str.split(',').length === 1) {
        return str
      } else {
        return str.split(',')[0].toString() + ' ' + (str.split(',').length - 1).toString() + '+'
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {
    if (event.target.className !== 'dropbtn' && event.target.className !== 'fas fa-rupee-sign' && event.target.className !== 'value_name') {
      if (document.getElementById("myDropdown") !== null) {
        document.getElementById("myDropdown").style.display = "none"
      }
    }
  });

  function handleOnReset() {
    contexData.SettempState(postData);
    FilterData = contexData.tempstate
    metaltypeRef.current.clearValue()
    DaybookRef.current.clearValue()
    unitRef.current.clearValue()
    setDefaultMetalType([])
    setDefaultDayBook([])
    setDefaultUnit([])
  }

  function handleArrowLeft(str) {
    if (contexData.tempstate[str] !== "") {
      var ans = ""

      const date = new Date(contexData.tempstate[str]);
      var month = date.getMonth() + 1
      // console.log(date.getFullYear());
      if (date.getDate() === 1) {
        if (month === 1) {
          ans = (date.getFullYear() - 1).toString() + "-12" + "-31"
        } else {
          ans = date.getFullYear().toString() + "-" + (month - 1).toString() + "-" + new Date(date.getFullYear(), month - 1, 0).getDate().toString()
        }
      } else {
        ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() - 1).toString()
      }

      var listarr = ans.split("-")
      // console.log(listarr);
      if (listarr[1].length < 2) {
        listarr[1] = "0" + listarr[1]
      }
      if (listarr[2].length < 2) {
        listarr[2] = "0" + listarr[2]
      }
      // console.log(listarr);
      ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
      // document.getElementById("FromDate").value = ans;
      contexData.SettempState({ ...contexData.tempstate, [str]: ans })
    }

  }
  function handleArrowRight(str) {
    if (contexData.tempstate[str] !== "") {
      var ans = ""

      const date = new Date(contexData.tempstate[str]);
      var month = date.getMonth() + 1
      // console.log(date.getFullYear());
      if (date.getDate() === new Date(date.getFullYear(), month, 0).getDate()) {
        if (month === 12) {
          ans = (date.getFullYear() + 1).toString() + "-01" + "-01"
        } else {
          ans = date.getFullYear().toString() + "-" + (month + 1).toString() + "-01"
        }
      } else {
        ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() + 1).toString()
      }

      var listarr = ans.split("-")
      // console.log(listarr);
      if (listarr[1].length < 2) {
        listarr[1] = "0" + listarr[1]
      }
      if (listarr[2].length < 2) {
        listarr[2] = "0" + listarr[2]
      }
      // console.log(listarr);
      ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
      // document.getElementById("FromDate").value = ans;
      contexData.SettempState({ ...contexData.tempstate, [str]: ans })
    }
  }

  function handleNavbar() {

    if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
      const element = document.getElementsByClassName("crancy-smenu")[0];
      element.classList.remove("crancy-close");

      const element1 = document.getElementsByClassName("crancy-header")[0];
      element1.classList.remove("crancy-close");

      const element2 = document.getElementsByClassName("crancy-adashboard")[0];
      element2.classList.remove("crancy-close");

      if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
        const element3 = document.getElementsByClassName("crancy-adashboard")[1];
        element3.classList.remove("crancy-close");
      }

    } else {
      const element = document.getElementsByClassName("crancy-smenu")[0];
      element.classList.add("crancy-close");

      const element1 = document.getElementsByClassName("crancy-header")[0];
      element1.classList.add("crancy-close");

      const element2 = document.getElementsByClassName("crancy-adashboard")[0];
      element2.classList.add("crancy-close");

      if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
        const element3 = document.getElementsByClassName("crancy-adashboard")[1];
        element3.classList.add("crancy-close");
      }
    }

  }

  function handlePercentageShow(e) {
    // console.log(e.target.checked, "gg");
    if (e.target.checked) {
      contexData.SettempState({ ...contexData.tempstate, ['column']: 'Prc' })
    } else {
      contexData.SettempState({ ...contexData.tempstate, ['column']: 'NetWeight' })
    }
  }

  function downloadExcelDocument() {
    contexData.setflagExcel(contexData.flagExcel + 1)
  }

  function handleselectUnit(e) {
    if (e !== null) {
      setDefaultUnit(e);
      contexData.SettempState({ ...contexData.tempstate, ['Unity']: e.value })
    }
  }

  return (
    <>
      <header className="crancy-header">
        <div className="container g-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="crancy-header__inner">
                <div className="crancy-header__middle">
                  <div className="crancy-header__left">
                    <div className="crancy-header__nav-bottom">
                      <div className="logo crancy-sidebar-padding">
                        <a className="crancy-logo">
                          <img
                            className="crancy-logo__main"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--dark"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--small"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--small--dark"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                        </a>
                      </div>
                    </div>

                    <div
                      id="crancy__sicon"
                      className="crancy__sicon close-icon" onClick={handleNavbar}
                    >
                      <i
                        className="fas fa-angle-left"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </div>
                  </div>
                  <div className="geex-content__header">
                    <div className="geex-content__header__content">
                      <div className="geex-content__header__customizer">
                        <h2 className="geex-content__header__title">
                          Sales Efficiency Analysis Dashboard
                        </h2>
                      </div>
                    </div>
                    <div className="geex-content__header__action">
                      <div className="geex-content__header__action__wrap">
                        <ul className="geex-content__header__quickaction">
                          <li className="from-date-to-date-header__quickaction">
                            <h5>
                              Last Sync :{syncDate}
                              <span className="text-muted">
                                { }
                              </span>
                            </h5>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                              id="Currency_Button"
                            >
                              <div className="button-open">
                                {localStorage.getItem("value") === "" ||
                                  localStorage.getItem("value") === null ? (
                                  <>

                                    {/* <img
                                      src={currency}
                                      className="dropbtn"
                                      onClick={handleonchangeCurrency}
                                    ></img>
                                     */}
                                    <button
                                      class="dropbtn"
                                      onClick={handleonchangeCurrency}>
                                      <i class='fas fa-rupee-sign'></i>
                                      <p class='value_name'> Default</p>
                                    </button>
                                    {/* <button class="fa fa-inr" aria-hidden="true" src={currency} className="dropbtn" onClick={handleonchangeCurrency} > </button> */}
                                  </>
                                ) : null}
                                {localStorage.getItem("value") === "k" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Thousand
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "l" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Lakh
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "m" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Million
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "c" ? (
                                  <button
                                    className=" dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Crore
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "b" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Billion
                                    </p>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                            <div id="myDropdown" class="dropdown-content">
                              <a
                                id="default"
                                onClick={() => handleThousand("")}
                              >
                                Default
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="thousand"
                                onClick={() => handleThousand("k")}
                              >
                                Thousand
                              </a>
                              <hr className="custom-hr" />
                              <a id="lakh" onClick={() => handleThousand("l")}>
                                Lakh
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="million"
                                onClick={() => handleThousand("m")}
                              >
                                Million
                              </a>
                              <hr className="custom-hr" />
                              <a id="crore" onClick={() => handleThousand("c")}>
                                Crore
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="billion"
                                onClick={() => handleThousand("b")}
                              >
                                Billion
                              </a>
                            </div>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i id="downloadPdf" className="fa-solid fa-file-pdf" onClick={downloadPdfDocument} > </i>
                            </div>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i id="downloadExcel" className="fa-solid fa-file-excel" onClick={downloadExcelDocument} > </i>
                            </div>
                          </li>


                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                              id="crancy-header__full"
                            >
                              <i
                                className="fas fa-expand-alt"
                                onClick={Handlefullscreen}
                              ></i>
                            </div>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i
                                className="fas fa-filter"
                                onClick={handlerOnOpen}
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {contexData.childFilterShow === true ? (
        <Commonmodel modelprops={props1} prdemo={demo} prdemoName={demoName} />
      ) : (
        <Modal
          className="modal-dialog modal-dialog-centered  modal-xl modal-filter"
          show={filterFlag}
          onHide={handleOnClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header class="modal-header">
            <h5 class="modal-title filter-modal-title"><i class="fa-solid fa-filter"></i> Filter By</h5>
            <button class="geex-btn geex-btn__customizer-close" onClick={handleOnClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                  fill="#ffffff" />
                <path
                  d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                  fill="#ffffff" fill-opacity="0.8" />
              </svg>
            </button>

          </Modal.Header>


          <Modal.Body class="modal-body">
            <div class="container">
              <div class="card-graph-detail">
                <div class="row">
                  <div class="filter-top">
                    <form class="form-group">
                      <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="card-filter-contain top-card-filter">
                            <label for="sel1" class="form-label">
                              From Date
                            </label>
                            <div class="date-picker-filter">

                              <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('FromDate') }} />
                              <input
                                class="form-control  date-spacing "
                                type="date"
                                onChange={handleonchange}
                                name="FromDate"
                                id="FromDate"
                                value={contexData.tempstate["FromDate"]}
                              />
                              {/* <i class="fa-solid fa-chevron-right"></i>fa-solid fa-caret-right date-arrow-right */}
                              <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('FromDate') }} />
                            </div>

                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="card-filter-contain top-card-filter">
                            <label for="sel1" class="form-label">
                              To Date
                            </label>
                            <div class="date-picker-filter">

                              <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('ToDate') }} />
                              <input
                                class="form-control"
                                type="date"
                                onChange={handleonchange}
                                name="ToDate"
                                value={contexData.tempstate["ToDate"]}
                                id="ToDate"

                              />
                              <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('ToDate') }} />
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="card-filter-contain top-card-filter">
                            <form class="from-group">
                              <label for="sel1" class="form-label">
                                Metal Type
                              </label>

                              {/* {console.log(DefaultMetalType)} */}
                              <Select
                                // defaultValue={[colourOptions[2], colourOptions[3]]}
                                name="MetalTypeSelect"
                                closeMenuOnSelect={false}
                                isMulti
                                ref={metaltypeRef}
                                options={MetalType}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleselect}
                                components={animatedComponents}
                                defaultValue={DefaultMetalType}
                                placeholder="Select..."
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    // height: '45px',
                                    // overflow:'auto',
                                    borderRadius: '10px'
                                  }),
                                }}
                              />
                            </form>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="card-filter-contain top-card-filter">
                            <form class="from-group">
                              <label for="sel1" class="form-label">
                                Day Book Selection
                              </label>
                              <Select
                                // defaultValue={[colourOptions[2], colourOptions[3]]}
                                closeMenuOnSelect={false}
                                name="DayBookSelect"
                                options={Daybook}
                                ref={DaybookRef}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleselect}
                                components={animatedComponents}
                                defaultValue={DefaultDaybook}
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    // height: '45px',
                                    borderRadius: '10px'
                                  }),
                                }}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <form>
                <div class="row">
                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fa-solid fa-building"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Branch
                      </label>
                      {/* <Select

														isMulti
														name="branchSelect"

														options={branch}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" id='123' value={formatedValue(contexData.tempstate["strBranchValue"])}
                        onClick={() => {
                          HandleOnClickComman(1);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-globe"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Region{" "}
                      </label>
                      {/* <Select
                          // defaultValue={[colourOptions[2], colourOptions[3]]}
                          isMulti
                          name="regionSelect"
                          options={region}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleselect}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                        /> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strRegionValue"])}
                        onClick={() => {
                          HandleOnClickComman(2);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-map-marker-alt"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;State
                      </label>

                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="stateSelect"

														options={state}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strStateValue"])}
                        onClick={() => {
                          HandleOnClickComman(3);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-city"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;City
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="citySelect"

														options={city}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strCity"])}
                        onClick={() => {
                          HandleOnClickComman(4);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-chart-area"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Item Group
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="itemGroupSelect"

														options={itemGroup}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strItemGroupValue"])}
                        onClick={() => {
                          HandleOnClickComman(5);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-boxes"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Product
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="productSelect"

														options={product}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strProductValue"])}
                        onClick={() => {
                          HandleOnClickComman(6);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-project-diagram"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Item
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="itemSelect"

														options={item}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strItemValue"])}
                        onClick={() => {
                          HandleOnClickComman(7);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-th-list"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Sub-Item
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="subItemSelect"

														options={subItem}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strSubItemValue"])}
                        onClick={() => {
                          HandleOnClickComman(8);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-sitemap"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Item with Sub-item
                      </label>
                      {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="itemSubItemSelect"

												options={itemSubitem}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strItemSubitemValue"])}
                        onClick={() => HandleOnClickComman(9)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-gem"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Design Catalogue
                      </label>
                      {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="designSelect"

												options={design}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strDesignCatalogueValue"])}
                        onClick={() => HandleOnClickComman(10)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-users"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Saleman
                      </label>
                      {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="salesmanSelect"

														options={salesman}

														className="basic-multi-select"
														classNamePrefix="select"
														// onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strSalemanValue"])}
                        onClick={() => HandleOnClickComman(11)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-layer-group"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Mode of Sale
                      </label>
                      {/* <div class="dropdown">
														<select class="selectpicker" multiple aria-label="Default select example"
															data-live-search="true">
															<option value="one">One</option>
															<option value="two">Two</option>
															<option value="three">Three</option>
															<option value="four">Four</option>
														</select>
													</div> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strModeofSaleValue"])}
                        onClick={() => HandleOnClickComman(12)}
                      />
                    </div>
                  </div>
                  {/* 
                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-stream"></i>
                      <label for="sel1" class="form-label">
                      &nbsp;Team & Mode of Sale
                      </label>
                      {/* <div class="dropdown">
														<select class="selectpicker" multiple aria-label="Default select example"
															data-live-search="true">
															<option value="one">One</option>
															<option value="two">Two</option>
															<option value="three">Three</option>
															<option value="four">Four</option>
														</select>
													</div> */}
                  {/* <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strTeamModeofSaleValue"])}
                        onClick={() => HandleOnClickComman(13)}
                      />
                    </div>
                  </div>  */}

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-chart-line"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Sale Aging
                      </label>
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strSaleAging"])}
                        onClick={() => HandleOnClickComman(14)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-people-carry"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Design
                      </label>
                      {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="purchasePartySelect"

												options={salesman}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strDesignCodeValue"])}
                        onClick={() => HandleOnClickComman(15)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-handshake"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Sales Party
                      </label>
                      {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="salesPartySelect"

												options={salesParty}

												className="basic-multi-select"
												classNamePrefix="select"
												// onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strSalesPartyValue"])}
                        onClick={() => HandleOnClickComman(16)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-calendar-alt"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Month
                      </label>

                      <input
                        className="filter-input" value={formatedValue(contexData.tempstate["strMonthValue"])}
                        onClick={() => HandleOnClickComman(17)}
                      />
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <div class="card-filter-contain">
                      <i class="fas fa-calendar-alt"></i>
                      <label for="sel1" class="form-label">
                        &nbsp;Units
                      </label>

                      <Select
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        name="unit"
                        ref={unitRef}
                        options={unit}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleselectUnit}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        defaultValue={Defaultunit}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: '45px',
                            borderRadius: '10px'
                          }),
                        }}
                      />
                    </div>
                  </div>

                  {/* <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
									<div class="card-filter-contain">
										<i class="fas fa-calendar-week"></i>
										<label for="sel1" class="form-label">Month</label>
										&nbsp;<div class="dropdown">
											<select class="selectpicker" multiple aria-label="Default select example"
												data-live-search="true">
												<option value="one">One</option>
												<option value="two">Two</option>
												<option value="three">Three</option>
												<option value="four">Four</option>
											</select>
										</div>
									</div>
								</div>

								<div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
									<div class="card-filter-contain">
										<i class="fas  fa-calendar-alt"></i>
										<label for="sel1" class="form-label">Year</label>
										<div class="dropdown">
											<select class="selectpicker" multiple aria-label="Default select example"
												data-live-search="true">
												<option value="one">One</option>
												<option value="two">Two</option>
												<option value="three">Three</option>
												<option value="four">Four</option>
											</select>
										</div>
									</div>
								</div> */}
                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer class="modal-footer">
            <button
              type="button"
              class="filter-footer-button"
              data-mdb-ripple-init
              onClick={handleOnReset}
            >
              {" "}
              Reset{" "}
            </button>
            <button
              type="button"
              class="filter-footer-button"
              data-mdb-ripple-init
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <div class="form-check checkbox-filter">
              {/* {console.log(percentage_check, "cheeck")} */}
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={handlePercentageShow}
                defaultChecked={percentage_check}
              />
              <label
                class="form-check-label checkbox-filter-label text-muted"
                for="flexCheckChecked"
              >
                (% Set as Default)
              </label>
            </div>
          </Modal.Footer>


        </Modal>
      )}
    </>
  );
}
