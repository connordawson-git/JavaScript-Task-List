//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all Event Listeners
loadEventListeners();

//Load all EventListeners
function loadEventListeners() {
  //Dom Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task EventListeners
  form.addEventListener('submit', addTask);
  //Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from localStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Creat text node and append
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

//Add Tasks
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
  } else {

    //Create li
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Creat text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';
    e.preventDefault();
  }
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  //Check for delte-item class
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove tasks from local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
  //taskList.innerHTML = '';
  //loop through tasks and remove them while there is still a frist child
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear From Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
  function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
