const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to check if the input box is empty or contains only whitespace
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

// Function to add task
function addTask() {
    if (isEmptyOrSpaces(inputBox.value)) {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Trim to remove leading/trailing spaces
        li.style.color = "blue"
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);


        inputBox.value = ""; // Clear the input text after adding the task
        saveData()
    }
}

// Event listener for list container click
listContainer.addEventListener("click", function(check){
    console.log(check.target.tagName);
    if(check.target.tagName === "LI")
    {  
        check.target.classList.toggle("checked");
        saveData()
    }
    else if (check.target.tagName === "SPAN"){
        check.target.parentElement.remove();
        saveData()
    }
});

// Function to save data to local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}
showTask();



// Event listener for clear button click
document.getElementById("Clear-todo").addEventListener("click", function() {
    listContainer.innerHTML = ""; // Clear the content of listContainer
    localStorage.removeItem("data"); // Remove data from local storage
});