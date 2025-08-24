const addTaskBox = document.getElementById("addtask");
const formBox = document.querySelector(".content-enter-box");
const formCloseBtn = document.querySelector(".closebtn");
const taskTitle = document.getElementById('title');
const taskBody = document.getElementById('taskbody');
const taskHolder = document.getElementById("taskholder");
const main = document.querySelector("main");

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let taskStoreBox = [];
let editIndex = null;

// 🔄 Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem("taskStoreBox");
  if (stored) {
    taskStoreBox = JSON.parse(stored);
    renderTasks();
  }
});

// 💾 Save tasks to localStorage
function saveToLocalStorage() {
  localStorage.setItem("taskStoreBox", JSON.stringify(taskStoreBox));
}

// ➕ Show form
addTaskBox.addEventListener('click', () => {
  formBox.style.display = "flex";
  editIndex = null;
});

// ✅ Submit form
formBox.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const body = taskBody.value.trim();
  const today = new Date();
  const date = [month[today.getMonth()], today.getDate(), today.getFullYear()];

  if (!title || !body) return;

  const task = { date, title, content: body };

  if (editIndex !== null) {
    taskStoreBox[editIndex] = task;
    editIndex = null;
  } else {
    taskStoreBox.unshift(task);
  }

  saveToLocalStorage();
  taskTitle.value = "";
  taskBody.value = "";
  formBox.style.display = "none";
  renderTasks();
});

// ❌ Close form
formCloseBtn.addEventListener('click', () => {
  formBox.style.display = "none";
  taskTitle.value = "";
  taskBody.value = "";
  editIndex = null;
});

// 🧱 Render all tasks
function renderTasks() {
  taskHolder.innerHTML = "";
  taskStoreBox.forEach((task, index) => {
    const div = document.createElement('div');
    div.classList.add("taskbox");
    div.dataset.index = index;
    div.innerHTML = `
      <div class="task-header">
        <span class="date">${task.date.join('-')}</span>
        <div class="modify-btns">
          <button class="edit">✏️</button>
          <button class="delete">🗑️</button>
        </div>
      </div>
      <div class="showcase-body">
        <span class="task-title">${task.title}</span>
        <p>${task.content}</p>
      </div>
    `;
    taskHolder.appendChild(div);
  });
}

// 🖱️ Handle clicks (edit, delete, view)
taskHolder.addEventListener('click', (e) => {
  const taskBox = e.target.closest('.taskbox');
  if (!taskBox) return;

  const index = parseInt(taskBox.dataset.index);
  const task = taskStoreBox[index];

  if (e.target.classList.contains('edit')) {
    taskTitle.value = task.title;
    taskBody.value = task.content;
    formBox.style.display = "flex";
    editIndex = index;
  } else if (e.target.classList.contains('delete')) {
    taskStoreBox.splice(index, 1);
    saveToLocalStorage();
    removeArticle();
    renderTasks();
  } else {
    removeArticle();
    showTask(task);
  }
});

// 📄 Show task details
function showTask(task) {
  const article = document.createElement("article");
  article.classList.add("task-show-box");
  article.innerHTML = `
    <label class="taskclosebtn">
      <span style="font-size: 18px; transform: rotate(-45deg);" class="material-symbols-outlined close">close</span>
    </label>
    <span class="tasktitle">${task.title}</span>
    <p class="taskbody">${task.content}</p>
  `;
  main.appendChild(article);

  article.querySelector(".taskclosebtn").addEventListener("click", () => {
    article.remove();
  });
}

// 🧹 Remove open article
function removeArticle() {
  const existing = document.querySelector(".task-show-box");
  if (existing) existing.remove();
}
