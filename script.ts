interface Entry {
    mood: string;
    energy: number;
    date: Date;
}

const moodSelect = document.getElementById('mood') as HTMLSelectElement;
const energyInput = document.getElementById('energy') as HTMLInputElement;
const recordBtn = document.getElementById('record-btn') as HTMLButtonElement;
const entryList = document.getElementById('entry-list') as HTMLUListElement;
const calendar = document.getElementById('calendar') as HTMLDivElement;
const toggleViewBtn = document.getElementById('toggle-view-btn') as HTMLButtonElement;

let entries: Entry[] = [];
let currentView: 'list' | 'calendar' = 'list';

// Load entries from localStorage
const storedEntries = localStorage.getItem('entries');
if (storedEntries) {
    entries = JSON.parse(storedEntries);
}

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
    entries.sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date in descending order
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
        const entriesForDay = entries.filter(entry => entry.date.getDate() === day && entry.date.getMonth() === month && entry.date.getFullYear() === year);
        if (entriesForDay.length > 0) {
            const moodEmoji = getMoodEmoji(entriesForDay[0].mood);
            div.innerHTML = `${day}<br>${moodEmoji}`;
            div.style.backgroundColor = getEnergyColor(entriesForDay[0].energy);
        }
        calendar.appendChild(div);
    }
}

// Get mood emoji
function getMoodEmoji(mood: string) {
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
function getEnergyColor(energy: number) {
    const redComponent = 255 - Math.round(energy * 2.55);
    const greenComponent = Math.round(energy * 2.55);
    return `rgb(${redComponent}, ${greenComponent}, 0)`;
}

// Record entry
recordBtn.addEventListener('click', () => {
    const mood = moodSelect.value;
    const energy = parseInt(energyInput.value);
    const date = new Date();
    const entry: Entry = { mood, energy, date };
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
