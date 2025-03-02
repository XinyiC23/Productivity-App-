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
