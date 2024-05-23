# Mood and Energy tracker

The tracker has two views

# List view

On the top of the page there's an input for current mood and energy levels. Mood can be one of the following: Awful, Bad, Meh, Good, Great and has corresponding emojis. Energy is represented as a sliding scale of 0 to 100 with a gradient from red to green. 

Record button saves entry with the current timestamp.

Under the input there's a list of all entries. Entries are sorted by date in reverse chronological order. Each entry has mood, energy, date, and buttons to edit and delete the entry. If there's only one entry for that date only the date part of the timestamp is shown, otherwise date and time is shown rounded to a minute.

# Calendar view

Calendar view shows a calendar for the current month in a grid. There's a title with the current month on top. In each cell of the grid there's a date, if there's an entry for that date the corresponding icon for the mood is shown and the grid space is colored with the color of the energy level gradient.
If there are multiiple entries on the same date they are shown as rows within the cell.

There's a toggle on the bottom of both views to switch to the other view.