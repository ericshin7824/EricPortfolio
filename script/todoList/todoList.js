"use strict";
const taskInput = document.querySelector(".task-input input"),
    fillters = document.querySelectorAll(".fillters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

// getting localstorage lists-container
let todos = JSON.parse(localStorage.getItem("lists-container"));

fillters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(fillter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (fillter == todo.status || fillter == "all") {
                li += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
                                <p class="${isCompleted}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fas fa-eraser"></i>
                                <ul class="task-menu">
                                    <li onclick="editTask(${id}, '${todo.name}')"><i class="fas fa-user-edit"></i>Edit</li>
                                    <li onclick="deleteTask(${id})"><i class="fas fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    // if li is not empty, insert this value inside taskbox else insert span
    taskBox.innerHTML = li || `<span class="no-task">You don't have any task here.</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    // getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        // removing show class from the tesk menu on the document click
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    document.getElementById("focus").focus();
}

function deleteTask(deleteId) {
    if (!document.getElementById("all").classList.contains("active") && taskBox.firstElementChild.tagName == "SPAN") {
        document.getElementById("pending").classList.remove("active");
        document.getElementById("completed").classList.remove("active");
        document.getElementById("all").classList.add("active");
    }

    // getting selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("lists-container", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    let currentStatus = taskBox.firstElementChild.tagName;

    if (!document.getElementById("all").classList.contains("active") && currentStatus == "SPAN") {
        document.getElementById("all").classList.add("active");
        document.getElementById("pending").classList.remove("active");
        document.getElementById("completed").classList.remove("active");
    }

    // getting all items of array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("lists-container", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTask) {
    // getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        // updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("lists-container", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            // push new task if isEditedTask is not true
            if (!todos) {
                // if todo is not exist, pass an empty array to todos
                todos = [];
            }
            let taskInfo = {
                name: userTask,
                status: "pending",
            };
            todos.push(taskInfo); // Adding new task to todos
        } else {
            // edit task if isEditedTask is not false
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        if (!document.getElementById("all").classList.contains("active")) {
            document.getElementById("all").classList.add("active");
            document.getElementById("pending").classList.remove("active");
            document.getElementById("completed").classList.remove("active");
        }

        taskInput.value = "";
        localStorage.setItem("lists-container", JSON.stringify(todos));
        showTodo("all");
    }
});
