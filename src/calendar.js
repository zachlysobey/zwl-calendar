import CalendarController from './calendar-controller';
import {DAYS} from './calendar-constants';

export function init(id) {
    const calendarCtrl = new CalendarController();
    const now = new Date();

    const currentMonth = calendarCtrl.getMonth(now.getMonth(), now.getFullYear());
    const currentDay = calendarCtrl.getDay(now.getDate(), now.getMonth(), now.getFullYear());

    const calendarElement = document.getElementById(id);

    calendarElement.innerHTML = buildCalendar(currentMonth, currentDay);

    const $cal = new CalendarDOM(calendarElement);

    $cal.previousMonthLink.addEventListener('click', () => {
        changeMonth($cal, calendarCtrl.previousMonth());
        return false;
    });

    $cal.nextMonthLink.addEventListener('click', () => {
        changeMonth($cal, calendarCtrl.nextMonth());
        return false;
    });
}

function buildCalendar(month, day) {
    const calendarHtml =  `
        <zwl-calendar>
            <section class="day-view">
                <p class="day-name">
                    ${day.dayName}
                </p>
                <p class="day-number">
                    ${day.dayNumber}
                </p>
            </section>
            <section class="month-view">
                <header class="month-navigation">
                    <a href="#" class="prev-month">&lt;</a>
                    <span class="current-month">
                        ${month.monthName}
                    </span>
                    <span class="current-year">
                        ${month.year}
                    </span>
                    <a href="#" class="next-month">&gt;</a>
                </header>
                <table class="month-table">
                    ${buildMonthTable(month.grid)}
                </table>
            <section>
        </zwl-calendar>
    `;
    return calendarHtml;
}

function buildMonthTable(grid) {
    return `
        <thead>${buildMonthTableHeader()}</thead>
        <tbody>${buildMonthTableBody(grid)}</tbody>
    `;
}

function buildMonthTableHeader() {
    const headerHtml = DAYS
        .map(dayName => dayName.charAt(0))
        .reduce((prev, curr) => prev + `<th>${curr}</th>`, '');
    return headerHtml;
}

function buildMonthTableBody(grid) {
    const rows = grid.map(week => {
        const cells = week.map(dayNumber => `<td>${dayNumber ? dayNumber : ''}</td>`);
        return `<tr>${cells.join('')}</tr>`;
    });
    return rows.join('');
}

function CalendarDOM(root) {
    this.previousMonthLink = root.getElementsByClassName('prev-month')[0];
    this.nextMonthLink = root.getElementsByClassName('next-month')[0];
    this.currentMonthTitle = root.getElementsByClassName('current-month')[0];
    this.currentYearTitle = root.getElementsByClassName('current-year')[0];
    this.monthTable = root.getElementsByClassName('month-table')[0];
}

function changeMonth($cal, newMonth) {
    $cal.currentMonthTitle.innerHTML = newMonth.monthName;
    $cal.currentYearTitle.innerHTML = newMonth.year;
    $cal.monthTable.innerHTML = buildMonthTable(newMonth.grid);
}
