// replace this with your Google Sheets ID ex: https://docs.google.com/spreadsheets/d/<this-is-your-google-sheets-id>/edit?gid=0#gid=0
const SSID = '125nQuPphGuPapGW5IozHbbTfFs8-028ssB4gomt6St0';
const SN_TODAY = 'today';
const SN_TODAY_HOURLY = 'today-hourly';
const SN_WEEKLY = 'weekly';

function getDailyForecast() {
  let url = 'https://api.open-meteo.com/v1/forecast?latitude=14.6042&longitude=120.9822&current=temperature_2m,precipitation,rain,weather_code&hourly=temperature_2m,precipitation_probability&timezone=Asia%2FSingapore&forecast_days=1';

  let response = UrlFetchApp.fetch(url);

  return JSON.parse(response.getContentText());
}

function getWeeklyForecast() {
  let url = 'https://api.open-meteo.com/v1/forecast?latitude=14.6042&longitude=120.9822&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_probability_min&timezone=Asia%2FSingapore';
  let response = UrlFetchApp.fetch(url);

  return JSON.parse(response.getContentText());
}

function saveAll() {
  saveToday();
  saveWeekly();
}

function saveToday() {
  let forecast = getDailyForecast();
  let result = flattenObject(forecast);

  // save hourly
    
  let hourly = [];
  let hourlyHeaders = ['time', 'precipitation_probability', 'temperature_2m_min',];
  for (let i=0; i<forecast.hourly.time.length; i++) {
    let hour = [];
    let day = forecast.hourly;
    hour.push(day.time[i]);
    hour.push(day.precipitation_probability[i] + '%');
    hour.push(day.temperature_2m[i] + forecast.hourly_units.temperature_2m);

    hourly.push(hour);
  }

  saveHourly({headers: hourlyHeaders, data: hourly});

  let cForecast = SpreadsheetApp.openById(SSID).getSheetByName(SN_TODAY);

  cForecast.getRange(1,1,1,result.headers.length).setValues([result.headers]);
  cForecast.getRange(2,1,1,result.data.length).setValues([result.data]);
}

function saveWeekly() {
  let forecast = getWeeklyForecast();

  let weekly = [];
  let weeklyHeaders = ['time', 'weather_code', 'precipitation_probability_max', 'precipitation_probability_min', 'temperature_2m_min', 'temperature_2m_max'];
  for (let i=0; i<forecast.daily.time.length; i++) {
    let daily = [];
    let day = forecast.daily;
    daily.push(day.time[i]);
    daily.push(day.weather_code[i]);
    daily.push(day.precipitation_probability_max[i] + '%');
    daily.push(day.precipitation_probability_min[i] + '%');
    daily.push(day.temperature_2m_min[i] + forecast.daily_units.temperature_2m_min);
    daily.push(day.temperature_2m_max[i] + forecast.daily_units.temperature_2m_max);

    weekly.push(daily);
  }

  let cForecast = SpreadsheetApp.openById(SSID).getSheetByName(SN_WEEKLY);

  cForecast.getRange(1,1,1,weeklyHeaders.length).setValues([weeklyHeaders]);
  cForecast.getRange(2,1,weekly.length,weeklyHeaders.length).setValues(weekly);
}

function saveHourly(result) {
  let cForecast = SpreadsheetApp.openById(SSID).getSheetByName(SN_TODAY_HOURLY);

  cForecast.getRange(1,1,1,result.headers.length).setValues([result.headers]);
  cForecast.getRange(2,1,result.data.length,result.headers.length).setValues(result.data);
}