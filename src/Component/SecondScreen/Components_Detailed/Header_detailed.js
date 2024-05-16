import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import contex from '../../contex/Contex';



export default function Header_detailed(props) {

    const [fullscreen, setFullScreen] = useState(false);
    const [syncDate, setSyncDate] = useState();
    const contextData = useContext(contex)

    useEffect(() => {
        getSyncDate()
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
    }, [])

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

    async function getSyncDate() {
        await post({}, API.GetDefaultScreenData, {}, 'post')
            .then((res) => {
                setSyncDate(res.data.lstResult[0].SyncDate)
            })
    }



    const navigate = useNavigate()

    function handleNavigation() {
        const element = document.getElementsByClassName("crancy-smenu")[0];
        element.classList.remove("crancy-close");

        const element1 = document.getElementsByClassName("crancy-header")[0];
        element1.classList.remove("crancy-close");

        const element2 = document.getElementsByClassName("crancy-adashboard")[0];
        element2.classList.remove("crancy-close");
        if (props.screen === 2) {
            navigate('/schedual_analysis', { replace: true })
        } else {
            navigate('/Home', { replace: true })
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

            const element3 = document.getElementsByClassName("crancy-adashboard")[1];
            element3.classList.remove("crancy-close");
        } else {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.add("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.add("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.add("crancy-close");
            console.log("element2", document.getElementsByClassName("crancy-adashboard")[1]);
            const element3 = document.getElementsByClassName("crancy-adashboard")[1];
            element3.classList.add("crancy-close");
        }

    }
    function handleResetAllContext() {
        console.log(props);
        if (props.screen === 2) {
            contextData.SetdetailedState({
                "TravellingTeamID": 0,
                "Mode": 0
            });
            contextData.setbillState({
                "ScheduleID": 0,
                "Mode": 0
            })
        } else {
            contextData.setDefaultChart({
                "strBranch": "",
                "strCompanyID": "",
                "strState": "",
                "strCity": "",
                "strItem": "",
                "strSubItem": "",
                "strItemGroup": "",
                "strRegionID": "",
                "strItemSubitem": "",
                "strPurchaseParty": "",
                "strDesignCodeID": "",
                "strSalesParty": "",
                "strSaleman": "",
                "strProduct": "",
                "strDesignCatalogue": "",
                "strSaleAging": "",
                "strModeofSale": "",
                "strTeamModeofSale": "",
                "FromDate": "",
                "ToDate": "",
                "strMetalType": "",
                "strDayBook": "",
                "PageNo": 1,
                "PageSize": 10,
                "Search": "",
                "Grouping": "",
                "SortBy": "wt-desc",
                "SortByLabel": "",
            })
            contextData.setchartImage({
                "strBranch": "",
                "strState": "",
                "strCity": "",
                "strRegionID": "",
                "strSubItem": "",
                "strItem": "",
                "strItemGroup": "",
                "strItemSubitem": "",
                "strDesignCodeID": "",
                "strSalesParty": "",
                "strSaleman": "",
                "strProduct": "",
                "strDesignCatalog": "",
                "strSaleAging": "",
                "strMonth": "",
                "strFinYear": "",
                "PageNo": 1,
                "PageSize": 5
            })
        }
    }
    return (
        <header class="crancy-header">
            <div class="container g-0">
                <div class="row g-0">
                    <div class="col-12">
                        <div class="crancy-header__inner">
                            <div class="crancy-header__middle">
                                <div class="crancy-header__left">
                                    <div class="crancy-header__nav-bottom">
                                        <div class="logo crancy-sidebar-padding">
                                            <a class="crancy-logo">
                                                <img
                                                    class="crancy-logo__main"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                                <img
                                                    class="crancy-logo__main--small"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    <div id="crancy__sicon" class="crancy__sicon close-icon" onClick={handleNavbar}>
                                        <i class="fas fa-angle-right" style={{ color: '#ffffff' }}></i>
                                    </div>
                                </div>
                                <div class="geex-content__header">
                                    <div class='geex-header-title-date'>
                                        <div class="geex-content__header__content">
                                            <div class="geex-content__header__customizer">
                                                <h2 class="geex-content__header__title">
                                                    {props.screen === 2 ? "Schedule Analysis" : "Sales Efficiency Analysis Dashboard"}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="geex-content__header__action">
                                        <div class="geex-content__header__action__wrap">
                                            <ul class="geex-content__header__quickaction">
                                                <li class="from-date-to-date-header__quickaction">
                                                    <h5>
                                                        Last Sync :
                                                        <span class="text-muted"
                                                        >{syncDate}</span
                                                        >
                                                    </h5>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                        id="crancy-header__full"
                                                    >
                                                        <i class="fas fa-expand-alt" onClick={Handlefullscreen}></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link"
                                                    >
                                                        <i class="fas fa-sync" onClick={handleResetAllContext}></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <a>
                                                        <div
                                                            class="geex-content__header__quickaction__link"
                                                        >
                                                            <i class="fas fa-reply-all" onClick={handleNavigation} ></i>
                                                        </div>
                                                    </a>
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
    )
}



