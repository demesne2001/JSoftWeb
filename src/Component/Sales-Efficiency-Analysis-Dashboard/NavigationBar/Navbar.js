import React, { useContext, useEffect, useState } from 'react'

import jsoftInitial from '../../Assets/image/logo/jsoft-initial.png'
import jsoftMini from '../../Assets/image/Jsoft.png'
import { json, useNavigate } from 'react-router-dom';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import contex from '../../contex/Contex';

export default function Navbar() {
  const navigate = useNavigate();
  const contexData = useContext(contex);
  // const [ChartPage, setChartPage] = useState([]);
  let TotalPage = []
  // useEffect(() => {
  //   if (ChartPage.length <= 0) {
  //     FetchPageData()
  //   }
  // }, [])
  let input = {
    VendorID: 0,
    PageID: 0
  }
  let ChartPage = []
  ChartPage = JSON.parse(localStorage.getItem('PageData'))

  function FetchPageData() {
    post(input, API.GetPageData, [], 'post').then((res) => {
      if (res.data != undefined) {
        if (res.data.lstResult.length > 0) {
          // setChartPage(res.data.lstResult)
        }
      }
    })

  }

  const [syncDate, setSyncDate] = useState()
  useEffect(() => {
    getSyncDate()
  }, [])

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
      document.getElementsByClassName('NavbarFooter')[0].style.bottom = '36px'
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
      document.getElementsByClassName('NavbarFooter')[0].style.bottom = '64px'
    }

  }

  function HandleLogoClick() {
    navigate('/Home', { replace: true })
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleSchedualAnalysisClick() {
    navigate('/schedual_analysis', { replace: true })
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleOnDashboardClick() {
    navigate('/Home', { replace: true })
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleOnStockToSalesClick() {
    navigate('/Stock_To_Sales', { replace: true });
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleMinimumStock() {
    navigate('/minimum_stocks', { replace: true });
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }
  function handleDynamicPageClick(id, name) {
    navigate('/DynamicPage', { state: { PageID: id, PageName: name }, replace: true })
  }

  async function getSyncDate() {
    await post({}, API.GetDefaultScreenData, {}, 'post')
      .then((res) => {
        if (res.data !== undefined) {
          setSyncDate(res.data.lstResult[0].SyncDate)
        } else {
          alert(res['Error']);
        }
      })
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('PageData');
    localStorage.removeItem('username');
    navigate('/', { replace: true })
  }

  function openMenu() {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }

  function handleTour() {
    let tourguide = []
    if (window.innerWidth <= 770 && window.innerWidth > 480) {
      tourguide = [
        { element: '#Currency_Button', popover: { title: 'Currency Button', description: "Here's the button which is used to change the units of the amount.", side: "left", align: 'start' } },
        { element: '#downloadPdf', popover: { title: 'Pdf Export', description: 'This button is used to export whole dashboard into pdf.', side: "left", align: 'end' } },
        { element: '#downloadExcel', popover: { title: 'Excel Export', description: 'This button is used to export your data and dashboard into the excel file.', side: "left", align: 'start' } },
        { element: '#filtericon', popover: { title: 'Filters', description: 'This button open a filter modal. This Filter includes various field by which you can filter out the data.', side: "left", align: 'start' } },
        { element: '#themeicon', popover: { title: 'Themes', description: 'This button open a Theme modal. You can select the theme and also reset it.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(13)', popover: { title: 'Legend of Chart', description: 'Legend component shows symbol, color and name of different series. You can click legends to toggle displaying series in the chart.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(21)', popover: { title: 'Data View', description: 'Data view tool, which could display data in current chart and updates chart after being edited.', side: "top", align: 'start' } },
        { element: 'g path:nth-child(22)', popover: { title: 'Save as Image', description: 'It is used to save the chart in image formate.', side: "top", align: 'start' } },
        { element: '#cardrow', popover: { title: 'Cards of all Dashboard', description: 'This cards show the important figures which give the over all information of your business.', side: "bottom", align: 'start' } },
        { element: '#sorticonfordatasorting', popover: { title: 'Sorting', description: 'This button used to sort your data in four diffirent way.', side: "bottom", align: 'start' } },
        { element: '#icon_drop', popover: { title: 'Chart Option', description: 'By using Chart options, You can see our data into diffirent type of charts.', side: "bottom", align: 'start' } },
        { element: '#chartnavbar', popover: { title: 'Navigate to Detail Screen', description: 'By clicking this header, You can redirect to the detail screen of particular chart.', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(4)', popover: { title: 'Zoom In', description: 'This button is used to zoom in your charts', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(3)', popover: { title: 'Reset', description: 'By using Reset Button, you can reset your chart.', side: "bottom", align: 'start' } },
        { element: 'g g path:nth-child(1)', popover: { title: 'Slider', description: 'By using slider, You can set the range and show some specific data.', side: "right", align: 'start' } },
        { element: 'g path:nth-child(37)', popover: { title: 'Chart Click Option', description: 'Chart click option is used to reflect the sub chart according to selected data.', side: "bottom", align: 'start' } },
        { element: '#checkboxofdetailscreen', popover: { title: 'Set as default', description: 'By cheked this option, you can set a particular slider option as default ', side: "right", align: 'start' } },
        { element: '#imageid', popover: { title: 'Image View', description: 'By Clicking this image, You redirect to the gallery screen in which you can see your product clearly.', side: "right", align: 'start' } },
        { element: '.syncdata', popover: { title: 'Sync Data', description: 'This label shows you the timing when your data is sync.', side: "right", align: 'start' } },
      ]
    } else if (window.innerWidth <= 480) {
      tourguide = [
        { element: '#Currency_Button', popover: { title: 'Currency Button', description: "Here's the button which is used to change the units of the amount.", side: "left", align: 'start' } },
        { element: '#filtericon', popover: { title: 'Filters', description: 'This button open a filter modal. This Filter includes various field by which you can filter out the data.', side: "left", align: 'start' } },
        { element: '#themeicon', popover: { title: 'Themes', description: 'This button open a Theme modal. You can select the theme and also reset it.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(13)', popover: { title: 'Legend of Chart', description: 'Legend component shows symbol, color and name of different series. You can click legends to toggle displaying series in the chart.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(21)', popover: { title: 'Data View', description: 'Data view tool, which could display data in current chart and updates chart after being edited.', side: "top", align: 'start' } },
        { element: 'g path:nth-child(22)', popover: { title: 'Save as Image', description: 'It is used to save the chart in image formate.', side: "top", align: 'start' } },
        { element: '#cardrow', popover: { title: 'Cards of all Dashboard', description: 'This cards show the important figures which give the over all information of your business.', side: "bottom", align: 'start' } },
        { element: '#sorticonfordatasorting', popover: { title: 'Sorting', description: 'This button used to sort your data in four diffirent way.', side: "bottom", align: 'start' } },
        { element: '#icon_drop', popover: { title: 'Chart Option', description: 'By using Chart options, You can see our data into diffirent type of charts.', side: "bottom", align: 'start' } },
        { element: '#chartnavbar', popover: { title: 'Navigate to Detail Screen', description: 'By clicking this header, You can redirect to the detail screen of particular chart.', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(4)', popover: { title: 'Zoom In', description: 'This button is used to zoom in your charts', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(3)', popover: { title: 'Reset', description: 'By using Reset Button, you can reset your chart.', side: "bottom", align: 'start' } },
        { element: 'g g path:nth-child(1)', popover: { title: 'Slider', description: 'By using slider, You can set the range and show some specific data.', side: "right", align: 'start' } },
        { element: 'g path:nth-child(37)', popover: { title: 'Chart Click Option', description: 'Chart click option is used to reflect the sub chart according to selected data.', side: "bottom", align: 'start' } },
        { element: '#checkboxofdetailscreen', popover: { title: 'Set as default', description: 'By cheked this option, you can set a particular slider option as default ', side: "right", align: 'start' } },
        { element: '#imageid', popover: { title: 'Image View', description: 'By Clicking this image, You redirect to the gallery screen in which you can see your product clearly.', side: "right", align: 'start' } },
        { element: '.syncdata', popover: { title: 'Sync Data', description: 'This label shows you the timing when your data is sync.', side: "right", align: 'start' } },
      ]
    } else {
      tourguide = [
        { element: '#Currency_Button', popover: { title: 'Currency Button', description: "Here's the button which is used to change the units of the amount.", side: "left", align: 'start' } },
        { element: '#downloadPdf', popover: { title: 'Pdf Export', description: 'This button is used to export whole dashboard into pdf.', side: "left", align: 'end' } },
        { element: '#downloadExcel', popover: { title: 'Excel Export', description: 'This button is used to export your data and dashboard into the excel file.', side: "left", align: 'start' } },
        { element: '#fullscreenicon', popover: { title: 'Full screen mode', description: 'This button is used to enable full screen mode. In addition, You can disable this mode by again clicking it.', side: "left", align: 'start' } },
        { element: '#filtericon', popover: { title: 'Filters', description: 'This button open a filter modal. This Filter includes various field by which you can filter out the data.', side: "left", align: 'start' } },
        { element: '#themeicon', popover: { title: 'Themes', description: 'This button open a Theme modal. You can select the theme and also reset it.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(13)', popover: { title: 'Legend of Chart', description: 'Legend component shows symbol, color and name of different series. You can click legends to toggle displaying series in the chart.', side: "left", align: 'start' } },
        { element: 'g path:nth-child(21)', popover: { title: 'Data View', description: 'Data view tool, which could display data in current chart and updates chart after being edited.', side: "top", align: 'start' } },
        { element: 'g path:nth-child(22)', popover: { title: 'Save as Image', description: 'It is used to save the chart in image formate.', side: "top", align: 'start' } },
        { element: '#cardrow', popover: { title: 'Cards of all Dashboard', description: 'This cards show the important figures which give the over all information of your business.', side: "bottom", align: 'start' } },
        { element: '#sorticonfordatasorting', popover: { title: 'Sorting', description: 'This button used to sort your data in four diffirent way.', side: "bottom", align: 'start' } },
        { element: '#icon_drop', popover: { title: 'Chart Option', description: 'By using Chart options, You can see our data into diffirent type of charts.', side: "bottom", align: 'start' } },
        { element: '#chartnavbar', popover: { title: 'Navigate to Detail Screen', description: 'By clicking this header, You can redirect to the detail screen of particular chart.', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(4)', popover: { title: 'Zoom In', description: 'This button is used to zoom in your charts', side: "bottom", align: 'start' } },
        { element: 'g path:nth-last-child(3)', popover: { title: 'Reset', description: 'By using Reset Button, you can reset your chart.', side: "bottom", align: 'start' } },
        { element: 'g g path:nth-child(1)', popover: { title: 'Slider', description: 'By using slider, You can set the range and show some specific data.', side: "right", align: 'start' } },
        { element: 'g path:nth-child(37)', popover: { title: 'Chart Click Option', description: 'Chart click option is used to reflect the sub chart according to selected data.', side: "bottom", align: 'start' } },
        { element: '#checkboxofdetailscreen', popover: { title: 'Set as default', description: 'By cheked this option, you can set a particular slider option as default ', side: "right", align: 'start' } },
        { element: '#imageid', popover: { title: 'Image View', description: 'By Clicking this image, You redirect to the gallery screen in which you can see your product clearly.', side: "right", align: 'start' } },
        { element: '.syncdata', popover: { title: 'Sync Data', description: 'This label shows you the timing when your data is sync.', side: "right", align: 'start' } },
      ]
    }
    if (window.innerWidth < 1278) {
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
      document.getElementsByClassName('NavbarFooter')[0].style.bottom = '36px'
    }
    if (window.location.pathname !== '/Home') {
      navigate('/Home', { replace: true });

    }

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      onNextClick: () => {

        if (driverObj.getActiveElement().id === 'chartnavbar') {
          navigate('/graph-detail', { state: { grouping: "a.BranchID,b.BranchName", columnID: 'BranchID', columnName: 'BranchName', componentName: "Branch Wise", filterKey: "strBranch", chartId: 1, FromDate: "", ToDate: "" }, replace: true })
          setTimeout(() => {
            driverObj.moveNext();
          }, 2000);
        } else if (driverObj.getActiveElement().id === 'imageid') {
          if (window.innerWidth < 1278 && driverObj.getActiveElement().id === 'imageid') {
            console.log("trueeee");
            const element = document.getElementsByClassName("crancy-smenu")[0];
            console.log(element, 'trueeee')
            element.classList.add("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.add("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.add("crancy-close");

            if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
              const element3 = document.getElementsByClassName("crancy-adashboard")[1];
              element3.classList.add("crancy-close");
            }
            document.getElementsByClassName('NavbarFooter')[0].style.bottom = '64px'
            setTimeout(() => {
              driverObj.moveNext();
            }, 1000);
          } else {
            navigate('/Home', { replace: true });
            setTimeout(() => {
              driverObj.moveNext();
            }, 1000);
          }

        } else {
          driverObj.moveNext();
        }
      },
      onPrevClick: () => {
        // console.log(driverObj.get(), "shdgasdg");
        if (driverObj.getState().activeStep.element === 'g path:nth-last-child(4)') {
          navigate('/Home', { replace: true });
          setTimeout(() => {
            driverObj.movePrevious();
          }, 2000);
        } else if (driverObj.getState().activeStep.element === '.syncdata') {
          navigate('/graph-detail', { state: { grouping: "a.BranchID,b.BranchName", columnID: 'BranchID', columnName: 'BranchName', componentName: "Branch Wise", filterKey: "strBranch", chartId: 1, FromDate: "", ToDate: "" }, replace: true })
          if (window.innerWidth < 1278) {
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
            document.getElementsByClassName('NavbarFooter')[0].style.bottom = '36px'
          }

          setTimeout(() => {
            driverObj.movePrevious();
          }, 2000);
        } else {
          driverObj.movePrevious();
        }
      },
      showProgress: true,
      showButtons: [
        'next',
        'previous',
        'close'
      ],
      steps: tourguide
    });
    if (window.location.pathname !== '/Home') {
      driverObj.drive();
    } else {
      setTimeout(() => {
        driverObj.drive();
      }, 1000);
    }
  }

  return (
    <div className="crancy-body-area">

      <div className="crancy-smenu" id="CrancyMenu">

        <div className="admin-menu">

          <div className="logo crancy-sidebar-padding pd-right-0">
            <a className="crancy-logo" onClick={HandleLogoClick}>

              <img className="crancy-logo__main" src={jsoftInitial} alt="#" />
              <img className="crancy-logo__main--dark" src={jsoftInitial} alt="#" />

              <img className="crancy-logo__main--small" src={jsoftMini} alt="#" />
              <img className="crancy-logo__main--small--dark" src={jsoftMini} alt="#" />
            </a>
            <div id="crancy__sicon" className="crancy__sicon close-icon" onClick={handleNavbar}>
              {/* <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="m9 5 7 7-7 7" />
              </svg> */}


              {/* <i style={{fontSize:'10px'}} class='fas'>&#xf105;</i> */}
              <i className="fas fa-angle-left" style={{ color: "#ffffff" }}></i>
            </div>
          </div>

          <div className="admin-menu__one crancy-sidebar-padding mg-top-20">

            <div className="menu-bar">
              <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
                <li><a className="collapsed" onClick={handleOnDashboardClick}><span className="menu-bar__text">
                  <i className="fas fa-home"></i>
                  <span className="menu-bar__name" >Sales Efficiency</span></span></a>
                </li>
                <li><a className="collapsed" onClick={handleOnStockToSalesClick}><span className="menu-bar__text">
                  <i className="fas fa-chart-line"></i>
                  <span className="menu-bar__name">Stock to sales</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-user-clock"></i>
                  <span className="menu-bar__name">Outstanding</span></span></a>
                </li>
                <li><a className="collapsed" onClick={handleSchedualAnalysisClick}><span className="menu-bar__text">
                  <i className="far fa-calendar-alt"></i>
                  <span className="menu-bar__name last-silderbar-title">Schedule
                    Analysis</span></span></a>
                </li>
                <li><a className="collapsed" onClick={handleMinimumStock}><span className="menu-bar__text">
                  <i className="fas fa-chart-line"></i>
                  <span className="menu-bar__name">Minimum Stocks</span></span></a>
                </li>
                {ChartPage !== null && ChartPage.length > 0 ? ChartPage.map((key, i) => {
                  return (
                    <li><a className="collapsed" onClick={() => handleDynamicPageClick(key.PageID, key.PageName)}><span className="menu-bar__text">
                      <i className={key.SVGPath != '' && key.SVGPath != undefined ? key.SVGPath : "fas fa-user-clock"}></i>
                      <span className="menu-bar__name">{key.PageName}</span></span></a>
                    </li>
                  )
                })
                  : null}


                <div className='NavbarFooter'>
                  <li><a className="collapsed">
                    <span className="menu-bar__text" >
                      <i className="fa-solid fa-circle-user fa-lg" onClick={openMenu} style={{ zIndex: '999999', position: 'relative' }}></i>
                      <span className="menu-bar__name">
                        <div class="profile" onClick={openMenu}>
                          <div class="user">
                            <h3>{localStorage.getItem("username")}</h3>
                            <p>@Alpha-E-barcode</p>
                          </div>
                        </div>
                        <li class="geex-content__header__quickaction__item navbari">
                          <div class="geex-content__header__quickaction__link  geex-btn__customizer" id="Filtermodal">
                            <i class="fa-solid fa-circle-info" onClick={handleTour}></i>
                          </div>
                        </li>

                      </span>

                      <div class="menu">
                        <ul>
                          <li><a><i class="fa-regular fa-user"></i>&nbsp;Profile</a></li>
                          <li onClick={handleLogOut}><a><i class="fa-solid fa-right-from-bracket"></i>&nbsp;Sign Out</a></li>
                        </ul>
                      </div>
                    </span></a>
                  </li>


                  <h5 className='syncdata'>
                    Last Sync :{syncDate}
                    <span className="text-muted">
                      { }
                    </span>
                  </h5>

                </div>

              </ul>

            </div>
          </div>
        </div>
      </div >
    </div >

  )
}
