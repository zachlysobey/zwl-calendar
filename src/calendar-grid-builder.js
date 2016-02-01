export function buildCalendarGrid(numberOfDays, firstDayIndex) {
    const grid = [];
    const numberOfWeeks = Math.ceil((numberOfDays + firstDayIndex) / 7);
    for (let i = 0; i < numberOfWeeks; i++) {
        const startDay = 1 + i * 7 - firstDayIndex;
        grid.push(buildRow(startDay, firstDayIndex, numberOfDays));
    }
    return grid;
}

function buildRow(start, firstDayIndex, maxDayNumber) {
    const row = [];
    for (let i = 0; i < 7; i++) {
        const dayNumber = start + i;
        if (dayNumber < 1) {
            row.push(null);
        } else if (dayNumber <= maxDayNumber) {
            row.push(dayNumber);
        } else {
            row.push(null);
        }
    }
    return row;
}
