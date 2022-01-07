//Object for localstorage and initial rendering
var tasks = {
  "9am": "",
  "10am": "",
  "11am": "",
  "12pm": "",
  "1pm": "",
  "2pm": "",
  "3pm": "",
  "4pm": "",
  "5pm": "",
};

//keys array with list of times
var keys = [[9, "9am"], [10, "10am"], [11, "11am"], [12, "12pm"], [13, "1pm"], [14, "2pm"], [15, "3pm"], [16, "4pm"], [17, "5pm"]];

//Querying DOM elements
var bodyContainer = $(".container");
var todaySpan = $("#currentDay");

//Gets current day in "Sunday, September 3rd" format
var day = moment().format("dddd, MMMM Do");
var currentHour = moment().hour();

//checks if localstorage contains object and then renders page
function pullTimes() {
  //sets time
  todaySpan.text(day);

  //checks if obj in local store
  var temp = JSON.parse(localStorage.getItem("tasks"));
  if (temp) {
    tasks = temp;
  }
  //calls funct to render page
  renderTimes();
  return;
}

//renders DOM elements to page and pulls from updated tasks object
function renderTimes() {
  //loops through keys and renders row for each
  for (var i = 0; i < keys.length; i++) {
    let keyHour = keys[i][0];
    let keyTime = keys[i][1];

    //Render DOM elements
    var taskRow = $("<div>").addClass("row");
    var pTag = $("<p>")
      .addClass("col-2 text-right p-2 hour")
      .text(keyTime);
    var textAreaTag = $("<textarea>")
      .addClass("col-8 ")
      .attr("id", keyHour)
      .attr("data-index", keyTime)
      .text(tasks[keyTime]);
    var iconTag = $("<i>").addClass("fas fa-save");
    var buttonTag = $("<button>")
      .addClass("col-2 btn saveBtn")
      .attr("data-index", keyHour)
      .append(iconTag);

    //sets time based classes
    if (currentHour > 17 || currentHour > keyHour){
      textAreaTag.addClass("past");
    } else if (currentHour < 9 || currentHour < keyHour){
      textAreaTag.addClass("future");
    } else {
      textAreaTag.addClass("present");
    }

    //append DOM elements to page
    taskRow.append(pTag);
    taskRow.append(textAreaTag);
    taskRow.append(buttonTag);
    bodyContainer.append(taskRow);
  }
  return;
}

//finds edited text and saves to localstorage
function setTimes(event) {
  //checks if button was clicked
  var isButton = event.target.nodeName === "BUTTON";
  if (!isButton){
    return;
  }

  //finds button, textarea and necessary key for tasks object
  var buttonIndex = event.target.dataset.index;
  var currentTextArea = $('#' + buttonIndex);
  var currentKey = currentTextArea[0].dataset.index;

  //updates tasks object with key
  tasks[currentKey] = currentTextArea.val();

  //updates or sets tasks object in localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return;
}

//listener checks for clicks and runs setTimes
$(".container").click(setTimes);

//runs pullTimes on page load
$(document).ready(pullTimes);