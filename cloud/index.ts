import moment from 'moment';

let weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
let currentDate = new Date()
let currentDay = weekDays[moment(currentDate).isoWeekday()-1]
let weekNumber = moment(currentDate).isoWeek()

export async function getScheduledDrivers() {
    let query = `query{
      getScheduledDrivers(userID:"admin123",password:"abcd123", weekNumber: `+weekNumber+`,day:"`+currentDay+`") {
        driverID,
        driverPhone,
        name,
        intervalStart,
        intervalEnd,
        pickupAreaID,
        isInWaitList
      }
    }`

    return await queryServer(query)  
  }

async function queryServer(graphQLQuery:string, variables?:any) {
    let url = "https://test.kartbites.com/data"

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ query: graphQLQuery, variables: variables}), // body data type must match "Content-Type" header
    });

    return await response.json(); // parses JSON response into native JavaScript objects 
  }