
/**section page */
function showSection(sectionId){
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    })
    document.getElementById(sectionId).style.display = "block";
}


// update time
function updateTime(){
    let now = new Date()

    hours = String(now.getHours()).padStart(2, "0");
    minutes = String(now.getMinutes()).padStart(2, "0");
    seconds = String(now.getSeconds()).padStart(2, "0");

    let greetings = document.getElementById("greeting");


    if(hours >= 5 && hours < 12){
        greetings.textContent = "Good Morning";
        greetings.style.color = "yellow";
    } 
    else if(hours >= 12 && hours < 17){
        greetings.textContent = "Good Afternoon";
        greetings.style.color = "orange";
    }
    else if(hours >= 17 && hours < 20){
        greetings.textContent = "Good Evening";
        greetings.style.color = "gray";
    }
    else{
        greetings.textContent = "Good Night";
        greetings.style.color = "black";
    }

    document.getElementById("updateTime").innerText = `${hours}: ${minutes}: ${seconds}`;

    setInterval(updateTime, 1000)
}

updateTime();

// update task
const addTask = document.getElementById("addTask");
const addBtn = document.getElementById("addBtn");
const addList = document.getElementById("addList");


addBtn.addEventListener("click", () =>{
    let taskText = addTask.value.trim();
    if(!taskText) return;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "remove";
    deleteBtn.style.margin = "10px";
    deleteBtn.style.backgroundColor = "lightblue";
    deleteBtn.style.marginLeft = "30px";

    let listItems = document.createElement("li");

    listItems.textContent = taskText;
    listItems.style.color = "gray";
    listItems.style.fontFamily = "Inter";

    deleteBtn.addEventListener("click", ()=>{
        listItems.remove();
    });

    listItems.appendChild(deleteBtn);
    addList.appendChild(listItems);
    addTask.value = "";
})

document.addEventListener("DOMContentLoaded", function(){
    
const display = document.getElementById("display")
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const stopBtn = document.getElementById("stopBtn");

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0
let isRunning = false;
let timer = null; 


function startwatch(){
    if(isRunning) return;
    isRunning = true;
    timer = setInterval(updateTime, 10)
}

function resetWatch(){
    clearInterval(timer)
    isRunning = false;
    hours = 0
    minutes = 0
    seconds = 0
    milliseconds = 0

    updateDisplay()
}

function stopWatch(){
    clearInterval(timer)
    isRunning = false
}

function updateTime(){
    milliseconds += 10
    if(milliseconds === 1000){
        milliseconds = 0
        seconds++
    }
    if(seconds === 60){
        seconds = 0
        minutes++
    }
    if(minutes === 60){
        minutes = 0
        hours++
    }

    updateDisplay()
}

function updateDisplay(){
    display.innerText = 
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(3, "0")
}


startBtn.addEventListener("click", startwatch);
resetBtn.addEventListener("click", resetWatch);
stopBtn.addEventListener("click", stopWatch)

})