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
var keys = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

//Querying DOM elements
var bodyContainer = $(".container");
var todaySpan = $("#currentDay");

//Gets current day in "Sunday, September 3rd" format
var day = moment().format("dddd, MMMM Do");

//checks if localstorage contains object and then renders page
function pullTimes() {
  //sets time
  todaySpan.text(day);

  //checks if obj in local store
  temp = JSON.parse(localStorage.getItem("tasks"));
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
    let keyIndex = keys[i];

    //Render DOM elements
    var taskRow = $("<div>").addClass("row").attr("data-index", keyIndex);
    var pTag = $("<p>")
      .addClass("col-2 text-right p-2 hour")
      .text(keyIndex);
    var textAreaTag = $("<textarea>")
      .addClass("col-8 ")
      .attr("id", "taskItem")
      .text(tasks[keyIndex]);
    var iconTag = $("<i>").addClass("fas fa-save");
    var buttonTag = $("<button>")
      .addClass("col-2 btn saveBtn")
      .append(iconTag);

    //append DOM elements to page
    taskRow.append(pTag);
    taskRow.append(textAreaTag);
    taskRow.append(buttonTag);
    bodyContainer.append(taskRow);
  }
  return;
}

function setTimes(event) {

  localStorage.setItem("tasks", JSON.stringify(tasks));
  return;
}

$(".saveBtn").on("click", setTimes);

$(document).ready(pullTimes);