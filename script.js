document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  loadTasks();

  // Add task when button is clicked
  addTaskBtn.addEventListener('click', addTask);

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-actions">
        <button class="complete-btn" title="Complete"><i class="fas fa-check"></i></button>
        <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // Add to the top of the list
    taskList.insertBefore(taskItem, taskList.firstChild);

    // Clear input
    taskInput.value = '';

    // Add event listeners to new buttons
    taskItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
    taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);

    // Save tasks to localStorage
    saveTasks();
  }

  function toggleComplete(e) {
    const taskItem = e.target.closest('li');
    taskItem.classList.toggle('completed');
    saveTasks();
  }

  function deleteTask(e) {
    const taskItem = e.target.closest('li');
    taskItem.classList.add('fade-out');
    setTimeout(() => {
      taskItem.remove();
      saveTasks();
    }, 300);
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
      tasks.push({
        text: task.querySelector('.task-text').textContent,
        completed: task.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
          <span class="task-text">${task.text}</span>
          <div class="task-actions">
            <button class="complete-btn" title="Complete"><i class="fas fa-check"></i></button>
            <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        `;
        taskList.appendChild(taskItem);

        // Add event listeners
        taskItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
      });
    }
  }
});