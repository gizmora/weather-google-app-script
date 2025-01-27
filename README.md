# OpenMeteo Connector using Google App Script and Google Sheets

OpenMeteo is a open-source weather API that doesn't require API key (completely free). It provides free weather data provided by esteemed weather services.

## Update!!!

*Due to changes in the OpenMeteo Weather API, the script won't work as instructed. I will be updating the code. Stay tuned! For now enjoy the [demo](https://drive.google.com/file/d/1jsimIxWPcE1V6usjy-pEXo_w1LyufwyM/view?usp=sharing) ;). *

## Description

Using Google App Script, we can build a built-in menu in Google Sheets to pull data from OpenMeteo Weather API and save data in the same Google Sheet file.

## Setup

Could we leverage OpenMeteo's free API and Google Sheets to create a spreadsheet containing daily, hourly and weekly forecast given today's date? Yes we could using this simple setup:

1. Make a copy of this Google Sheet [template](https://docs.google.com/spreadsheets/d/125nQuPphGuPapGW5IozHbbTfFs8-028ssB4gomt6St0/edit?gid=0#gid=0).
2. Open the file. Head over to the menu and click *Extensions > App Script*. A new tab should open.
3. In the App Script file, change the variable *SSID* to your corresponding Google Sheets id.
4. Go back to the sheets file. Click *Weather Forecast > Get All Forecast*. If this the first time you are running, you will be asked for permissions to run the script.
5. If you allowed permissions, the file should update with the latest weather data.

## Notes

* The script would need your permission in order to run like [this](https://imgur.com/a/GUt6462).
* If you don't want to run the script, here's a [demo](https://drive.google.com/file/d/1jsimIxWPcE1V6usjy-pEXo_w1LyufwyM/view?usp=sharing) instead.
