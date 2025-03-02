// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to the clicked button and corresponding pane
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Timer Logic
let timerInterval;
let timeLeft = 60;

document.getElementById('start-timer').addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});

document.getElementById('reset-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 60;
  updateTimerDisplay();
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// To-Do List Logic
document.getElementById('add-task').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  if (taskInput.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

document.getElementById('clear-completed').addEventListener('click', () => {
  const completedTasks = document.querySelectorAll('#task-list li.completed');
  completedTasks.forEach(task => task.remove());
});

// Pomodoro Timer Logic
let pomodoroInterval;
let pomodoroTimeLeft = 25 * 60;
let isWorkTime = true;

document.getElementById('start-pomodoro').addEventListener('click', () => {
  if (!pomodoroInterval) {
    const workDuration = parseInt(document.getElementById('pomodoro-work').value) * 60;
    const breakDuration = parseInt(document.getElementById('pomodoro-break').value) * 60;
    pomodoroTimeLeft = isWorkTime ? workDuration : breakDuration;
    pomodoroInterval = setInterval(updatePomodoro, 1000);
  }
});

document.getElementById('reset-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroTimeLeft = 25 * 60;
  updatePomodoroDisplay();
});

function updatePomodoro() {
  if (pomodoroTimeLeft > 0) {
    pomodoroTimeLeft--;
    updatePomodoroDisplay();
  } else {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    isWorkTime = !isWorkTime;
    const workDuration = parseInt(document.getElementById('pomodoro-work').value) * 60;
    const breakDuration = parseInt(document.getElementById('pomodoro-break').value) * 60;
    pomodoroTimeLeft = isWorkTime ? workDuration : breakDuration;
    updatePomodoroDisplay();
  }
}

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTimeLeft / 60);
  const seconds = pomodoroTimeLeft % 60;
  document.getElementById('pomodoro-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Notes Logic
document.getElementById('save-notes').addEventListener('click', () => {
  const notes = document.getElementById('notes-input').value;
  if (notes.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = notes;
    li.addEventListener('click', () => {
      li.remove();
    });
    document.getElementById('notes-list').appendChild(li);
    document.getElementById('notes-input').value = '';
  }
});

// Settings Logic
document.getElementById('dark-mode').addEventListener('change', (e) => {
  document.body.classList.toggle('dark-mode', e.target.checked);
});

document.getElementById('accent-color').addEventListener('change', (e) => {
  document.documentElement.style.setProperty('--accent-color', e.target.value);
});
