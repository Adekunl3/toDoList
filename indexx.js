const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to check if the input box is empty or contains only whitespace
function inputEmpty(empt) {
    return empt === null || empt.match(/^ *$/) !== null;
}

// Function to add task
function addTask() {
    if (inputEmpty(inputBox.value)) {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; 
        li.style.color = "blue"
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);

    }
        inputBox.value = ""; // Clear the input text after adding the task
        saveData()
}

function editTask(event) {
    if (event.target.tagName === "LI" && event.target.textContent !== "") {
        inputBox.value = event.target.textContent;
        event.target.remove();
        inputBox.focus();
    }
}

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
        saveData()
    }
});


listContainer.addEventListener("click", function(check){
    // console.log(check.target.tagName);
    if(check.target.tagName === "LI")
    {  
        check.target.classList.toggle("checked");
        // console.log(mm)
        saveData()
     
    }
    else if (check.target.tagName === "SPAN"){
        check.target.parentElement.remove();
        saveData()
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); // Save to local storage
}

window.addEventListener('load', function() {
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    }
});
// Event listener for list container double-click
listContainer.addEventListener("dblclick", editTask);


//the filter function
function showTask(tasks) {
    listContainer.innerHTML = tasks;
}

// showTask("<li> my name is kunle</li>")

const completedButton = document.querySelector('.buttons .completed');
const uncompletedButton = document.querySelector('.buttons .uncompleted')
const all = document.querySelector('.buttons .all')

function showCompleted() {
    let completedTasks = "";
    document.querySelectorAll("li.checked").forEach(function(task) {
        completedTasks += task.outerHTML;
    });
    if (completedTasks !== "") {
        showTask(completedTasks);
        completedButton.style.backgroundColor = 'red';
        uncompletedButton.style.backgroundColor = 'white';
        all.style.backgroundColor ='white'
        

    } else {
        // completedButton.style.backgroundColor = 'yellow';
    }

    if (completedTasks !== "") {
        console.log(listContainer.innerHTML);
    }

}
function showUncompleted() {
    let uncompletedTasks = "";
    document.querySelectorAll("li:not(.checked)").forEach(function(task) {
        uncompletedTasks += task.outerHTML;
    });
    if (uncompletedTasks !==""){
        showTask(uncompletedTasks)
        uncompletedButton.style.backgroundColor = 'green';
        completedButton.style.backgroundColor = 'white';
        all.style.backgroundColor ='white'
    }
}
function showAll() {
    showTask(localStorage.getItem("data"));
    all.style.backgroundColor ='blue'
    uncompletedButton.style.backgroundColor = 'white';
        completedButton.style.backgroundColor = 'white';
}
// Event listener for clear button click
document.getElementById("Clear-todo").addEventListener("click", function() {
    listContainer.innerHTML = ""; // Clear the content of listContainer
    uncompletedButton.style.backgroundColor = 'white';
    completedButton.style.backgroundColor = 'white';
    all.style.backgroundColor ='white'
});
