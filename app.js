// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
const pageTitle = document.getElementById('page-title');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to the clicked button and corresponding pane
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    pageTitle.textContent = button.textContent.trim();
  });
});

// Timer Logic
let timerInterval;
let timeLeft = 0;

document.getElementById('start-timer').addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});

document.getElementById('stop-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById('reset-timer').addEventListener('click', () => {
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
  document.getElementById('timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Pomodoro Timer Logic
let pomodoroInterval;
let pomodoroTimeLeft = 25 * 60; // Default work duration
let isWorkTime = true;

document.getElementById('start-pomodoro').addEventListener('click', () => {
  if (!pomodoroInterval) {
    pomodoroInterval = setInterval(updatePomodoro, 1000);
  }
});

document.getElementById('stop-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
});

document.getElementById('reset-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroTimeLeft = 25 * 60; // Reset to default work duration
  updatePomodoroDisplay();
});

function updatePomodoro() {
  if (pomodoroTimeLeft > 0) {
    pomodoroTimeLeft--;
    updatePomodoroDisplay();
  } else {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    isWorkTime = !isWorkTime; // Switch between work and break
    pomodoroTimeLeft = isWorkTime ? 25 * 60 : 5 * 60; // Default work and break durations
    updatePomodoroDisplay();
  }
}

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTimeLeft / 60);
  const seconds = pomodoroTimeLeft % 60;
  document.getElementById('pomodoro-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Allow editing the countdown by clicking on it
document.getElementById('pomodoro-display').addEventListener('click', () => {
  const display = document.getElementById('pomodoro-display');
  display.contentEditable = true;
  display.focus();
});

document.getElementById('pomodoro-display').addEventListener('blur', () => {
  const display = document.getElementById('pomodoro-display');
  const time = display.textContent.split(':');
  const minutes = parseInt(time[0]) || 0;
  const seconds = parseInt(time[1]) || 0;
  pomodoroTimeLeft = minutes * 60 + seconds;
  display.contentEditable = false;
});

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

// Notes Logic
let isSelectMode = false;
let selectedNotes = [];

// Toggle Select Mode
document.getElementById('select-notes').addEventListener('click', () => {
  isSelectMode = !isSelectMode;
  document.getElementById('select-notes').textContent = isSelectMode ? 'Unselect' : 'Select';
  document.querySelectorAll('#notes-list li').forEach(note => {
    note.classList.toggle('selectable', isSelectMode);
  });
});

// Select Notes
document.getElementById('notes-list').addEventListener('click', (e) => {
  if (isSelectMode && e.target.tagName === 'LI') {
    e.target.classList.toggle('selected');
    if (e.target.classList.contains('selected')) {
      selectedNotes.push(e.target);
    } else {
      selectedNotes = selectedNotes.filter(note => note !== e.target);
    }
  }
});

// Delete Selected Notes
document.getElementById('delete-notes').addEventListener('click', () => {
  selectedNotes.forEach(note => note.remove());
  selectedNotes = [];
  isSelectMode = false;
  document.getElementById('select-notes').textContent = 'Select';
});

// Create Folder and Move Selected Notes
document.getElementById('create-folder').addEventListener('click', () => {
  if (selectedNotes.length === 0) {
    alert('No notes selected!');
    return;
  }

  const folderName = prompt('Enter folder name:') || 'Untitled';
  const folder = document.createElement('div');
  folder.className = 'folder';
  folder.textContent = folderName;

  // Create a list inside the folder to hold notes
  const folderNotesList = document.createElement('ul');
  folderNotesList.className = 'folder-notes-list';

  // Move selected notes into the folder
  selectedNotes.forEach(note => {
    folderNotesList.appendChild(note.cloneNode(true));
    note.remove();
  });

  folder.appendChild(folderNotesList);
  document.getElementById('folders-list').appendChild(folder);

  // Clear selection
  selectedNotes = [];
  isSelectMode = false;
  document.getElementById('select-notes').textContent = 'Select';
});

// Open Folder
document.getElementById('folders-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('folder')) {
    const folderNotesList = e.target.querySelector('.folder-notes-list');
    if (folderNotesList) {
      folderNotesList.classList.toggle('open');
    }
  }
});

// Save Notes
document.getElementById('save-notes').addEventListener('click', () => {
  const notes = document.getElementById('notes-input').value;
  if (notes.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = notes;
    li.addEventListener('click', () => {
      if (isSelectMode) {
        li.classList.toggle('selected');
      }
    });
    document.getElementById('notes-list').appendChild(li);
    document.getElementById('notes-input').value = '';
  }
});
// Open Folder
document.getElementById('folders-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('folder')) {
    const folderNotesList = e.target.querySelector('.folder-notes-list');
    if (folderNotesList) {
      folderNotesList.classList.toggle('open');
    }
  }
});

// Save Notes
document.getElementById('save-notes').addEventListener('click', () => {
  const notes = document.getElementById('notes-input').value;
  if (notes.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = notes;
    li.addEventListener('click', () => {
      if (isSelectMode) {
        li.classList.toggle('selected');
      }
    });
    document.getElementById('notes-list').appendChild(li);
    document.getElementById('notes-input').value = '';
  }
});
// Font Controls
document.getElementById('font-select').addEventListener('change', (e) => {
  document.getElementById('notes-input').style.fontFamily = e.target.value;
});

document.getElementById('font-size').addEventListener('change', (e) => {
  document.getElementById('notes-input').style.fontSize = `${e.target.value}px`;
});

document.getElementById('font-color').addEventListener('change', (e) => {
  document.getElementById('notes-input').style.color = e.target.value;
});

// Settings Logic
document.getElementById('dark-mode').addEventListener('change', (e) => {
  document.body.classList.toggle('dark-mode', e.target.checked);
});

document.getElementById('accent-color').addEventListener('change', (e) => {
  document.documentElement.style.setProperty('--accent-color', e.target.value);
  document.documentElement.style.setProperty('--background-color', e.target.value);
});

document.getElementById('theme-select').addEventListener('change', (e) => {
  if (e.target.value === 'light') {
    document.body.classList.remove('dark-mode');
    document.documentElement.style.setProperty('--background-color', '#f4f4f9');
    document.documentElement.style.setProperty('--text-color', '#333');
  } else if (e.target.value === 'dark') {
    document.body.classList.add('dark-mode');
    document.documentElement.style.setProperty('--background-color', '#333');
    document.documentElement.style.setProperty('--text-color', '#fff');
  } else {
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000');
  }
});
