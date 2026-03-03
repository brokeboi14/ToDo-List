const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    addTask(newTask);

        input.value = '';
});

function addTask(task) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add('task-text');
    if (task.completed) span.classList.add('completed');
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
    });

    span.addEventListener('click', function() {
        span.classList.toggle('completed');
        const currentTask = tasks.find(t => t.id === task.id);
        if (currentTask) {
        currentTask.completed = !currentTask.completed;
            }
        saveTasks();
    });

    taskList.appendChild(li);
}

tasks.forEach(task => addTask(task));