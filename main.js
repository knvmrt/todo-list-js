document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  });
  
  let tasks = [];
  
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.draggable = true;
      li.setAttribute("ondragstart", "drag(event)");
      li.setAttribute("ondrop", "drop(event)");
      li.setAttribute("ondragover", "allowDrop(event)");
      li.setAttribute("data-index", index); // Set the data-index attribute to track the index
      li.innerHTML = `
      
        <table style="width:100%">
  <tr>
    <td >${task}</td>
    <td style="width:7%;" >
    <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
    <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
    </td>

  </tr>

</table>
      `;
      taskList.appendChild(li);
    });
  }
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push(taskText);
      renderTasks();
      taskInput.value = "";
    }
  }
  
  function editTask(index) {
    const newTaskText = prompt("Yeni görev metnini girin:");
    if (newTaskText !== null) {
      tasks[index] = newTaskText.trim();
      renderTasks();
    }
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-index")); // Store the index of the dragged item
  }
  
  function drop(event) {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData("text/plain"); // Get the index of the dragged item
    const toIndex = event.target.getAttribute("data-index"); // Get the index of the drop target
    if (fromIndex === toIndex) return; // If dragged and dropped on the same item, do nothing
    const draggedTask = tasks[fromIndex];
    tasks.splice(fromIndex, 1); // Remove the item from its original position
    tasks.splice(toIndex, 0, draggedTask); // Insert the item at the new position
    renderTasks();
  }
  