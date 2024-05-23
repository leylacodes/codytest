// Load entries from localStorage
const storedEntries = localStorage.getItem('entries');
let entries = storedEntries ? JSON.parse(storedEntries) : [];
let currentView = 'list';

const moodRadios = document.querySelectorAll('input[name="mood"]');
const energyInput = document.getElementById('energy');
const recordBtn = document.getElementById('record-btn');
const entryList = document.getElementById('entry-list');
const calendar = document.getElementById('calendar');
const toggleViewBtn = document.getElementById('toggle-view-btn');

// Render entries
function renderEntries() {
    if (currentView === 'list') {
        renderListView();
    } else {
        renderCalendarView();
    }
}

// Render list view
function renderListView() {
    entryList.innerHTML = '';
    entries.sort((a, b) => b.date - a.date); // Sort by date in descending order
    entries.forEach(entry => {
        const li = document.createElement('li');
        const moodEmoji = getMoodEmoji(entry.mood);
        const date = entry.date.toLocaleString();
        li.innerHTML = `<span>${moodEmoji}</span><span>${entry.energy}</span><span>${date}</span>`;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        entryList.appendChild(li);
    });
}

// Render calendar view
function renderCalendarView() {
    calendar.innerHTML = '';
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create calendar grid
    for (let i = 0; i < firstDayOfMonth; i++) {
        const div = document.createElement('div');
        calendar.appendChild(div);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement('div');
        div.textContent = day.toString();
        const entriesForDay = entries.filter(entry => new Date(entry.date).getDate() === day && new Date(entry.date).getMonth() === month && new Date(entry.date).getFullYear() === year);
        if (entriesForDay.length > 0) {
            const moodEmoji = getMoodEmoji(entriesForDay[0].mood);
            div.innerHTML = `${day}<br>${moodEmoji}`;
            div.style.backgroundColor = getEnergyColor(entriesForDay[0].energy);
        }
        calendar.appendChild(div);
    }
}

// Get mood emoji
function getMoodEmoji(mood) {
    switch (mood) {
        case 'awful':
            return '😩';
        case 'bad':
            return '😞';
        case 'meh':
            return '😐';
        case 'good':
            return '😊';
        case 'great':
            return '😃';
        default:
            return '';
    }
}

// Get energy color
function getEnergyColor(energy) {
    const redComponent = 255 - Math.round(energy * 2.55);
    const greenComponent = Math.round(energy * 2.55);
    return `rgb(${redComponent}, ${greenComponent}, 0)`;
}

// Record entry
recordBtn.addEventListener('click', () => {
    const selectedMoodRadio = document.querySelector('input[name="mood"]:checked');
    const mood = selectedMoodRadio ? selectedMoodRadio.value : '';
    const energy = parseInt(energyInput.value);
    const date = new Date();
    const entry = { mood, energy, date };
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
});

// Toggle view
toggleViewBtn.addEventListener('click', () => {
    currentView = currentView === 'list' ? 'calendar' : 'list';
    renderEntries();
});

// Initial render
renderEntries();