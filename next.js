
/**section page */
function showSection(sectionId){
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
        
    })
    document.getElementById(sectionId).style.display = "block";
}

//update time
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

document.addEventListener("DOMContentLoaded", onloadTask)
const addTask = document.getElementById("addTask");
const addBtn = document.getElementById("addBtn");
const addList = document.getElementById("addList");

addBtn.addEventListener("click", importTask)

function importTask(){
    let taskText = addTask.value.trim();
    if(!taskText) return;

    let listItems = document.createElement("li");
    let deleteBtn = document.createElement("button");

    listItems.textContent = taskText;
    deleteBtn.textContent = "Remove";

    Object.assign(deleteBtn.style, {
        margin: "10px",
        backgroundColor: "red"
    })

    deleteBtn.addEventListener("click", function(){
        listItems.remove()
        deleteTask(taskText)
    })

    addList.appendChild(listItems);
    listItems.appendChild(deleteBtn);


    saveTask(taskText)

    addTask.value = "";
}

function saveTask(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.push(taskText)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function onloadTask(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach(task => {
        let listItems = document.createElement("li");
        listItems.textContent = task;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";

        Object.assign(deleteBtn.style, {
            margin: "10px",
            backgroundColor: "red"
        })

        deleteBtn.addEventListener("click", function(){
            listItems.remove();
            deleteTask(task)
        })

        listItems.appendChild(deleteBtn)
        addList.appendChild(listItems);
    })

}

function deleteTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(t => t !== task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

(function () {

// Update stopWatch
const currTime = document.getElementById("currTime")
const startBtn = document.getElementById("startBtn")
const resetBtn = document.getElementById("resetBtn")
const stopBtn = document.getElementById("stopBtn")

let minutes = 0, seconds = 0, milliseconds = 0
let timer = null
let isRunning = false

function loadState(){
    let savedState = JSON.parse(localStorage.getItem("stopwatch")) || {}

    minutes = savedState.minutes || 0;
    seconds = savedState.seconds || 0;
    milliseconds = savedState.milliseconds || 0;
    isRunning = savedState.isRunning || false;

    updateDisplay()

    if(isRunning){
        startWatch(true)
    }

}

function startWatch(fromLoad = false){
    if(isRunning && !fromLoad) return;
    isRunning = true
    timer = setInterval(updateTime, 10)

    saveState()
}

function resetWatch(){
   clearInterval(timer)
   isRunning = false

   minutes = 0
   seconds = 0
   milliseconds = 0

   updateDisplay()
   saveState()
}

function stopWatch(){
    clearInterval(timer);
    isRunning = false;

    saveState()
}

function updateTime(){
    milliseconds += 10;

    if(milliseconds === 1000){
        milliseconds = 0
        seconds++
    }
    if(seconds === 60){
        seconds = 0
        minutes++
    }

    updateDisplay()
    saveState()
}

function updateDisplay(){
    currTime.innerText = 
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(3, "0")
   
}

function saveState(){
    localStorage.setItem("stopwatch", JSON.stringify({
        minutes,
        seconds,
        milliseconds,
        isRunning
    }))
}

startBtn.addEventListener("click", startWatch);
resetBtn.addEventListener("click", resetWatch);
stopBtn.addEventListener("click", stopWatch)

window.onload = loadState;

})();


//Weather App

const searchButton=  document.querySelector('#searchBtn');
const cityInput= document.querySelector('#data');

const apiKey =  'a0cee04a2b8214ca5cbb3915b2a90673';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function weatherApp(city){
    try{
        const display = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await display.json();

        if(data === '404'){
            alert("Enter a valid city Name")
        }

        document.querySelector('#temp').textContent = `Temperature: ${data.main.temp} °C`;
        document.querySelector('#humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.querySelector('#description').textContent = `Weather: ${data.weather[0].description}`;
        document.querySelector('#wind').textContent = `Wind: ${data.wind.speed} m/s`;
    }

    catch(error){
        console.error("Error", error)
    }
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city){
        weatherApp(city)
    }
    else{
        alert("Enter a city Name")
    }
})