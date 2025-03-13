
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