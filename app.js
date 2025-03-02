// Timer Logic
let timerInterval;
let timeLeft = 0;

document.getElementById('startTimer').addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 0;
  updateTimerDisplay();
});

function updateTimer() {
  timeLeft++;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// To-Do List Logic
document.getElementById('addTask').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

// Notes Logic
document.getElementById('saveNotes').addEventListener('click', () => {
  const notes = document.getElementById('notes').value;
  localStorage.setItem('savedNotes', notes);
  alert('Notes saved!');
});

// Load saved notes
document.getElementById('notes').value = localStorage.getItem('savedNotes') || '';
