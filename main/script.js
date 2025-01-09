let currentNoteId = null;

function initializeApp() {
    loadNotes();
    document.getElementById('noteEditor').style.display = 'none';
}

function addNewNote() {
    currentNoteId = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
    document.getElementById('noteEditor').style.display = 'block';
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const body = document.getElementById('noteBody').value;

    if (!title || !body) return;

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const timestamp = new Date().toLocaleString();

    if (currentNoteId) {
        const index = notes.findIndex(note => note.id === currentNoteId);
        if (index !== -1) {
            notes[index] = { ...notes[index], title, body, timestamp };
        }
    } else {
        notes.unshift({
            id: Date.now(),
            title,
            body,
            timestamp
        });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    closeEditor();
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const container = document.getElementById('recentNotes');
    container.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'border-b border-gray-700 pb-4';
        noteElement.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div onclick="editNote(${note.id})" class="cursor-pointer">
                            <h3 class="text-white text-2xl font-medium">${note.title}</h3>
                            <p class="text-gray-400 text-sm">${note.body.substring(0, 50)}...</p>
                            <p class="text-gray-600 text-xs mt-1 text-right">${note.timestamp}</p>
                        </div>
                        <button onclick="deleteNote(${note.id})" class="text-gray-400 hover:text-white">✕</button>
                    </div>
                `;
        container.appendChild(noteElement);
    });
}

function editNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes.find(note => note.id === id);
    if (note) {
        currentNoteId = id;
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteBody').value = note.body;
        document.getElementById('noteEditor').style.display = 'block';
    }
}

function deleteNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    loadNotes();
}

function closeEditor() {
    document.getElementById('noteEditor').style.display = 'none';
    currentNoteId = null;
}



initializeApp();