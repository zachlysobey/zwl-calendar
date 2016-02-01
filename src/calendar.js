import CalendarController from './calendar-controller';
import {DAYS} from './calendar-constants';

export function init(id) {
    const calendarCtrl = new CalendarController();
    const now = new Date();

    const calendarElement = document.getElementById(id);

    const currentMonth = calendarCtrl.getMonth(now.getMonth(), now.getFullYear());
    const currentDay = calendarCtrl.getDay(now.getDate(), now.getMonth(), now.getFullYear());

    calendarElement.innerHTML = buildCalendar(currentMonth, currentDay);

    const previousMonthLink = calendarElement.getElementsByClassName('prev-month')[0];
    const nextMonthLink = calendarElement.getElementsByClassName('next-month')[0];
    const currentMonthTitle = calendarElement.getElementsByClassName('current-month')[0];
    const currentYearTitle = calendarElement.getElementsByClassName('current-year')[0];
    const monthTable = calendarElement.getElementsByClassName('month-table')[0];

    previousMonthLink.addEventListener('click', () => {
        const prevMonth = calendarCtrl.previousMonth();
        currentMonthTitle.innerHTML = prevMonth.monthName;
        currentYearTitle.innerHTML = prevMonth.year;
        monthTable.innerHTML = buildMonthTable(prevMonth.grid);
        return false;
    });

    nextMonthLink.addEventListener('click', () => {
        const nextMonth = calendarCtrl.nextMonth();
        currentMonthTitle.innerHTML = nextMonth.monthName;
        currentYearTitle.innerHTML = nextMonth.year;
        monthTable.innerHTML = buildMonthTable(nextMonth.grid);
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
