
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
    });
}

// Store the ID of the currently active note
let currentNoteId = null;

// Initialize the application when the page loads
function initializeApp() {
    loadNotes();
    document.getElementById('noteEditor').style.display = 'none';
}

// Create a new note by resetting the editor fields
function addNewNote() {
    currentNoteId = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
    document.getElementById('noteEditor').style.display = 'block';
}

// Save the current note to localStorage
function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const body = document.getElementById('noteBody').value;

    // Don't save if title or body is empty
    if (!title || !body) return;

    // Get existing notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const timestamp = new Date().toLocaleString();

    // Update existing note if editing, otherwise create new note
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

    // Save updated notes to localStorage and refresh the display
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    closeEditor();
}

// Display all saved notes in the UI
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const container = document.getElementById('recentNotes');
    container.innerHTML = '';

    // Create HTML elements for each note
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'border-b border-gray-700 pb-4';
        noteElement.innerHTML = `
                    <div class="flex justify-between items-start font-Inter">
                        <div onclick="editNote(${note.id})" class="cursor-pointer">
                            <h3 class="text-white text-2xl font-Inter font-bold tracking-tight">${note.title}</h3>
                            <p class="text-gray-400 text-sm">${note.body.substring(0, 50)}...</p>
                            <p class="text-custom-color text-xs mt-1">${note.timestamp}</p>
                        </div>
                        <button onclick="deleteNote(${note.id})" class="text-gray-400 hover:text-white">✕</button>
                    </div>
                `;
        container.appendChild(noteElement);
    });
}

// Load an existing note into the editor
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

// Remove a note from localStorage
function deleteNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    loadNotes();
}

// Hide the note editor
function closeEditor() {
    document.getElementById('noteEditor').style.display = 'none';
    currentNoteId = null;
}

// Toggle visibility of recent notes section
function toggleRecentNotes() {
    const recentNotes = document.getElementById('recentNotes');
    recentNotes.style.display = recentNotes.style.display === 'none' ? 'block' : 'none';
    recentNotes.classList.toggle('hidden');
    this.textContent = recentNotes.classList.contains('hidden') ? '▼' : '▲';
}

// Export the current note as a PDF file
function savePDF() {
    const title = document.getElementById('noteTitle').value;
    const body = document.getElementById('noteBody').value;

    // Validate that note has content before creating PDF
    if (!title || !body) {
        alert("Please enter a title and body for the note.");
        return;
    }

    const { jsPDF } = window.jspdf; // Access jsPDF from the global window object
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(22);
    doc.text(title, 10, 10);

    // Add body text with automatic page breaks
    doc.setFontSize(16);
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const textLines = doc.splitTextToSize(body, doc.internal.pageSize.width - margin * 2);

    let y = 30; // Starting y position for the body text
    for (let i = 0; i < textLines.length; i++) {
        if (y + 10 > pageHeight - margin) { // Add new page if text exceeds current page
            doc.addPage();
            y = margin; // Reset y position for the new page
        }
        doc.text(textLines[i], margin, y);
        y += 10; // Move down for next line
    }

    // Save the PDF with the note's title
    doc.save(`${title}.pdf`);
}

// Initialize the application when the script loads
initializeApp();