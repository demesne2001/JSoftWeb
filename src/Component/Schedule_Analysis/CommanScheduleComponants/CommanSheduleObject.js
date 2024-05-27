const CommanSheduleObject = {
    1: {xAxis : ["TravellingTeamName"], yAxis : ["achievedWt", "TargetWt", "Prc"], heading : "Target and Achieved", iconclassName : "fas fa-chart-line"},
    2: {xAxis : ["TravellingTeamName"], yAxis : ["AvgTimePerClient"], heading : "Average Time Spent per Client", iconclassName : "fas fa-user-clock"},
    4: {xAxis : ["TravellingTeamName"], yAxis : ["TotalParty", "VisitedParty"], heading : "Schedule Client Details", iconclassName : "fas fa-chalkboard-teacher"},
    5: {xAxis : ["TravellingTeamName"], yAxis : ["SpendDays"], heading : "No. of Trips and No. of Avg Days", iconclassName : "fas fa-calendar-day"},
    6: {xAxis : ["TravellingTeamName"], yAxis : ["AvgBill"], heading : "Total No. of Avg Bills Generated", iconclassName : "fa-solid fa-arrow-down-short-wide sorticon"},
    11: {xAxis : ["ScheduleName"], yAxis : ["achievedWT", "TargetWt", "Prc"], heading : "Schedule Wise Target and Achieved", iconclassName : "fas fa-chart-line"},
    12: {xAxis : ["ScheduleName"], yAxis : ["Avgtime"], heading : "Schedule Wise Average Time Spent per Client", iconclassName : "fas fa-user-clock"},
    13: {xAxis : ["ScheduleName"], yAxis : ["TargetWt", "salesWT", "kgPerEx", "TripPerEx"], heading : "Schedule Wise Expense to Sales, Expense per kg. and Trips", iconclassName : "fas fa-money-bill-wave"},
    14: {xAxis : ["ScheduleName"], yAxis : ["TotalParty", "VisitedParty"], heading : "Schedule Wise Schedule Client Details", iconclassName : "fas fa-chalkboard-teacher"},
    15: {xAxis : ["ScheduleName"], yAxis : ["SpendDays"], heading : "Schedule Wise No. of Trips and No. of Days", iconclassName : "fas fa-calendar-day"},
    16: {xAxis : ["ScheduleName"], yAxis : ["No.bill"], heading : "Schedule Wise Total No. of Bills Generated", iconclassName : "fa-solid fa-arrow-down-short-wide sorticon"},
    // 6: {xAxis : ["TravellingTeamName"], yAxis : ["noOfBill"], heading : "Schedule Client Details", iconclassName : "fa-solid fa-arrow-down-short-wide sorticon"},
}
export default CommanSheduleObject;