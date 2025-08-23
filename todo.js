const addTaskBox = document.getElementById("addtask");
const formBox = document.querySelector(".content-enter-box");
const formCloseBtn = document.querySelector(".closebtn");
const taskTitle = document.getElementById('title');
const taskBody = document.getElementById('taskbody');
const taskShowCase = document.querySelector('.taskbox');
const taskShowBox = document.querySelector('.task-show-box');
const taskHolder = document.getElementById("taskholder");
const main = document.querySelector("main");
const month=['Jan','Feb','Mar','Apr','May','Jun','Jul',
    'Aug','Sep','Oct','Nov','Dec'
]
let taskStoreBox = [];

addTaskBox.addEventListener('click', () => formBox.style.display = "flex");

formBox.addEventListener('submit', function (e) {
    e.preventDefault();
    let tasktitle = taskTitle.value.trim();
    let taskbody = taskBody.value.trim();
    let todayDate = new Date();
    let m=month[todayDate.getMonth()];
    let d=todayDate.getDate();
    let y=todayDate.getFullYear();
    console.log(m,d.toString().padStart(2,'0'),y)
    taskStoreBox.unshift({
        date: [m,d,y],
        title: tasktitle,
        content: taskbody
    });
    renderTask(taskStoreBox);
    showTask(taskStoreBox);

});
//add task logic
function renderTask(...tasks) {
    let div = document.createElement('div');
    div.classList.add("taskbox");
    let taskItems = tasks.map((task, index) => {
        return (div.innerHTML = `<div class="task-header">
                    <span class="date">${task[index].date[0]}-${task[index].date[1]}-${task[index].date[2]}</span>
                    <div class="modify-btns">
                        <label class="edit" for="edit">
                            <span style="font-size: 18px;" class="material-symbols-outlined">edit</span>
                            </label>
                            <label class="delete" for="delete">
                            <span style="font-size: 18px;" class="material-symbols-outlined">delete</span>
                            </label>
                            </div>
                            </div>
                            <div class="showcase-body">
                            <span class="task-title">${task[index].title}</span>
                            <p>${task[index].content}</p>
                            </div>`);
    });
    div.innerHTML = taskItems;
    taskHolder.append(div);
}
function showTask(...task) {
    task.map((task, index) => {
        return displayTask(task[index].title, task[index].content);
    })
}
function displayTask(tasktitle, task) {
    taskHolder.addEventListener('click', (e) => {
        console.log("clicked", e.target.parentNode.classList.contains("taskbox"))
        let showBox = e.target.parentNode.classList.contains("taskbox");
        taskStoreBox="";
        if (showBox) {
            let article = document.createElement("article");
            article.classList.add("task-show-box");
            article.innerHTML = ` <label for="closebutton" class="taskclosebtn">
            <span style="font-size: 18px; transform: rotate(-45deg);" id="closebutton"
            class="material-symbols-outlined close">close</span>
            </label>
            <span class="tasktitle">${tasktitle}</span>
            <p style="padding-right: 20px;" class="taskbody">${task}</p>`;
            main.append(article);
            article.onclick=(e)=>{
                let closebtn=e.target.classList.contains("taskclosebtn");
                if(closebtn){
                    e.target.parentNode.style.display="none";
                }
            }
        }
    });
}
function saveTaskItem() {

}
function loadTaskItem() {

}
//close button logic
function closeBtn(e) {
    e.target.parentNode.parentNode.style.display = "none";
    taskTitle.value = "";
    taskBody.value = "";
}
formCloseBtn.addEventListener('click', closeBtn);

