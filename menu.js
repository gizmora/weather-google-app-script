function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Weather Forecast') // Create a new menu in the UI
    .addItem('Get all forecasts', 'saveAll') // Add an item linked to a function
    .addItem('Get daily forecast', 'saveToday') // Add another item linked to a different function
    .addItem('Get weekly forecast', 'saveWeekly') // Add another item linked to a different function
    .addToUi(); // Add the menu to the UI
}
