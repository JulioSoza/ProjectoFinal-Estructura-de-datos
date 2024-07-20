class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.prev = null;
        this.next = null;
    }
}

class TaskList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addTask(description) {
        const newTask = new Task(description);
        if (!this.head) {
            this.head = this.tail = newTask;
        } else {
            this.tail.next = newTask;
            newTask.prev = this.tail;
            this.tail = newTask;
        }
        this.saveToLocalStorage();
    }

    removeTask(task) {
        if (task.prev) {
            task.prev.next = task.next;
        } else {
            this.head = task.next;
        }
        if (task.next) {
            task.next.prev = task.prev;
        } else {
            this.tail = task.prev;
        }
        this.saveToLocalStorage();
    }

    toggleTaskCompletion(task) {
        task.completed = !task.completed;
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const tasks = [];
        let current = this.head;
        while (current) {
            tasks.push({
                description: current.description,
                completed: current.completed
            });
            current = current.next;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    loadFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => this.addTask(task.description, task.completed));
    }
}

const taskList = new TaskList();
taskList.loadFromLocalStorage();

const taskInput = document.getElementById('new-task');
const taskListElement = document.getElementById('task-list');

function renderTask(task) {
    const li = document.createElement('li');
    li.textContent = task.description;
    if (task.completed) {
        li.classList.add('completed');
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        taskList.toggleTaskCompletion(task);
        li.classList.toggle('completed');
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
        taskList.removeTask(task);
        taskListElement.removeChild(li);
    });
    li.prepend(checkbox);
    li.append(deleteButton);
    taskListElement.appendChild(li);
}

document.getElementById('add-task').addEventListener('click', () => {
    const description = taskInput.value.trim();
    if (description) {
        taskList.addTask(description);
        taskInput.value = '';
        renderTask(taskList.tail);
    }
});

(function renderAllTasks() {
    let current = taskList.head;
    while (current) {
        renderTask(current);
        current = current.next;
    }
})();
