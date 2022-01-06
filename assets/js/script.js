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

var keys = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

var bodyContainer = $(".container");

function pullTimes() {
  temp = JSON.parse(localStorage.getItem("tasks"));
  if (temp) {
    tasks = temp;
  }
  renderTimes();
}

function renderTimes() {
  for (var i = 0; i < keys.length; i++) {
    let keyIndex = keys[i];

    //Render DOM elements
    var taskRow = $("<div>").addClass("row");
    var pTag = $("<p>")
      .addClass("col-2 text-right p-2")
      .attr("id", "hour")
      .text(keyIndex);
    var textAreaTag = $("<textarea>")
      .addClass("col-8")
      .attr("id", "taskItem")
      .text(tasks[keyIndex]);
    var iconTag = $("<i>").addClass("fas fa-save");
    var buttonTag = $("<button>")
      .addClass("col-2 btn")
      .attr("id", "saveBtn")
      .attr("data-index", keyIndex)
      .append(iconTag);

    //append DOM elements to page
    taskRow.append(pTag);
    taskRow.append(textAreaTag);
    taskRow.append(buttonTag);
    bodyContainer.append(taskRow);
  }
  return;
}

function setTimes() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

pullTimes();
