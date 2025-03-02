// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
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
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

// Notes Logic
document.getElementById('save-notes').addEventListener('click', () => {
  const notes = document.getElementById('notes-input').value;
  localStorage.setItem('savedNotes', notes);
  alert('Notes saved!');
});

// Load saved notes
document.getElementById('notes-input').value = localStorage.getItem('savedNotes') || '';

// Settings Logic
document.getElementById('dark-mode').addEventListener('change', (e) => {
  document.body.classList.toggle('dark-mode', e.target.checked);
});

document.getElementById('timer-duration').addEventListener('change', (e) => {
  timeLeft = parseInt(e.target.value);
  updateTimerDisplay();
});

document.getElementById('pomodoro-work').addEventListener('change', (e) => {
  // Update Pomodoro work duration
});

document.getElementById('pomodoro-break').addEventListener('change', (e) => {
  // Update Pomodoro break duration
});
