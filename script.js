const addTaskButton = document.getElementById("addTaskButton");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const addOfficeButton = document.getElementById("addOfficeButton");
const officeNameInput = document.getElementById("officeName");
const officeDateInput = document.getElementById("officeDate");
const officeTimeInput = document.getElementById("officeTime");
const officeHoursList = document.getElementById("officeHoursList");
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
document.addEventListener("DOMContentLoaded", renderTasks);
document.addEventListener("DOMContentLoaded", renderNextDueTask);
document.addEventListener("DOMContentLoaded", renderofficehours);
function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
}
//calendar buttons 
document.addEventListener('DOMContentLoaded', function(){
  const monthYear = document.getElementById('month-year');
  const daysContainer = document.getElementById('days');
  const months = ['January', 'February', 'March', 'April'
    , 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  let currentDate = new Date();
  let today = new Date();

  function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year,month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
     
    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = '';

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for(let i = firstDay; i > 0; i--){
      const dayDiv = document.createElement('div');
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add('fade');
      daysContainer.appendChild(dayDiv);
      }

    
    for(let i = 1; i <= lastDay; i++){
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
        dayDiv.classList.add('today');
      }
      daysContainer.appendChild (dayDiv);
    }

    const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() -1;
    for(let i = 1; i <= nextMonthStartDay; i++){
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      dayDiv.classList.add('fade');
      daysContainer.appendChild(dayDiv);
    }
  }

  prevButton.addEventListener('click', function(){
    currentDate.setMonth(currentDate.getMonth() -1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener('click', function(){
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});


addTaskButton.addEventListener("click", () => {
  const taskName = taskNameInput.value;
  const taskDate = taskDateInput.value;
  const priority = taskPrioritySelect.value;

  if (taskName === "") {
    alert("Please enter a task name");
    return;
  }

  const task = JSON.parse(localStorage.getItem("task")) || [];
  task.push({ name: taskName, date: taskDate, priority });
  localStorage.setItem("task", JSON.stringify(task));
  renderTasks();

  taskNameInput.value = "";
  taskDateInput.value = "";
  taskPrioritySelect.value = "";
});

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    addTask(task.name, task.date, task.priority, index);
  });
  renderNextDueTask();
}
addOfficeButton.addEventListener("click", () => {
  const name = officeNameInput.value;
  const date = officeDateInput.value;
  const time = officeTimeInput.value;

  if (name === "" || date === "" || time === "") {
    alert("Please fill out all fields");
    return;
  }

  const officeHours = JSON.parse(localStorage.getItem("officeHours")) || [];
  officeHours.push({ name, date, time });
  localStorage.setItem("officeHours", JSON.stringify(officeHours));
  renderofficehours();

  officeNameInput.value = "";
  officeDateInput.value = "";
  officeTimeInput.value = "";
});

function renderofficehours(){
  const officeHours = JSON.parse(localStorage.getItem("officeHours")) || [];

  officeHoursList.innerHTML = "";

  officeHours.forEach((office, index) => {
    addOfficeHours(office.name, office.date, office.time, index);
  });
}


function addOfficeHours(name, date, time, index) {
  const officeDiv = document.createElement("div");
  officeDiv.classList.add("task");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;

  const dateSpan = document.createElement("span");
  dateSpan.textContent = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  //should be libraries available for dates

  const timeSpan = document.createElement("span");
  timeSpan.textContent = time;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "✕";
  deleteButton.classList.add("deletebutton");

  deleteButton.addEventListener("click", () => {
  const officeHours = JSON.parse(localStorage.getItem("officeHours")) || [];

  officeHours.splice(index, 1);  

  localStorage.setItem("officeHours", JSON.stringify(officeHours));

  renderofficehours();
  });


  officeDiv.appendChild(deleteButton);
  officeDiv.appendChild(nameSpan);
  officeDiv.appendChild(dateSpan);
  officeDiv.appendChild(timeSpan);

  officeHoursList.appendChild(officeDiv);
}

function addTask(name, date, priority, index) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // name
  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;

  // date
  const dateSpan = document.createElement("span");
  if (date) {
   dateSpan.textContent = parseLocalDate(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    dateSpan.classList.add("task-date");
  }

  // priority
  const prioritySpan = document.createElement("span");
  if (priority === "high") {
    prioritySpan.textContent = "High Priority";
    prioritySpan.classList.add("urgent");
  } else if (priority === "medium") {
    prioritySpan.textContent = "Medium Priority";
    prioritySpan.classList.add("soon");
  } else {
    prioritySpan.textContent = "Low Priority";
    prioritySpan.classList.add("low");
  }

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "✕";
  deleteButton.classList.add("deletebutton");

  deleteButton.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];

  tasks.splice(index, 1);  

  localStorage.setItem("task", JSON.stringify(tasks));

  renderTasks();
  });

  taskDiv.appendChild(nameSpan);
  taskDiv.appendChild(dateSpan);
  taskDiv.appendChild(prioritySpan);
  taskDiv.appendChild(deleteButton);

  taskList.appendChild(taskDiv);
}
function renderNextDueTask() {
  const nextDueContainer = document.getElementById("nextDueTask");
  if (!nextDueContainer) return;

  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  nextDueContainer.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks.filter(task => {
    if (!task.date) return false;

    const taskDate = parseLocalDate(task.date);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= 3;  // within 3 days
  });

  upcomingTasks.sort((a, b) =>
    parseLocalDate(a.date) - parseLocalDate(b.date)
  );

  if (upcomingTasks.length === 0) {
    nextDueContainer.innerHTML = "<p>ALL FINISHED</p>";
    return;
  }

  upcomingTasks.forEach(task => {
    const taskDate = parseLocalDate(task.date);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("next-due-task");

    taskDiv.innerHTML = `
      <strong>${task.name}</strong><br>
      Due ${taskDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })}<br>
      ${diffDays === 0 ? "DUE TODAY" : `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`}
    `;

    nextDueContainer.appendChild(taskDiv);
  });
}