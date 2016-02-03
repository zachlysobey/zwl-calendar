import './polyfill/number-is-integer';
import CalendarController from './calendar-controller';
import {DAYS} from './calendar-constants';
require('./style.less');

export function init(id) {
    const calendarCtrl = new CalendarController();
    const now = new Date();

    const currentMonth = calendarCtrl.getMonth(now.getMonth(), now.getFullYear());

    calendarCtrl.setCurrentDay(now.getDate(), now.getMonth(), now.getFullYear());

    const calendarElement = document.getElementById(id);

    calendarElement.innerHTML = buildCalendar(currentMonth, calendarCtrl);

    const $cal = new CalendarDOM(calendarElement);

    document.addEventListener('keyup', event => {
        // TODO prevent action if input or textarea is focused
        const arrowKeyCodes = { left: 37, right: 39 };
        const keyCode = event.which || event.keyCode;
        if (keyCode === arrowKeyCodes.left) {
            changeMonth($cal, calendarCtrl.previousMonth(), calendarCtrl);
        }
        if (keyCode === arrowKeyCodes.right) {
            changeMonth($cal, calendarCtrl.nextMonth(), calendarCtrl);
        }
    });

    $cal.previousMonthLink.addEventListener('click', () => {
        changeMonth($cal, calendarCtrl.previousMonth(), calendarCtrl);
        return false;
    });

    $cal.nextMonthLink.addEventListener('click', () => {
        changeMonth($cal, calendarCtrl.nextMonth(), calendarCtrl);
        return false;
    });

    $cal.monthTableBody.addEventListener('click', event => {
        const srcElement = event.srcElement;
        if (srcElement.tagName !== 'A') {
            return true;
        }
        const dayNumber = srcElement.innerHTML;
        calendarCtrl.setCurrentDay(Number(dayNumber));
        const currentDay = calendarCtrl.getCurrentDay();
        $cal.dayName.innerHTML = currentDay.dayName;
        $cal.dayNumber.innerHTML = currentDay.dayNumber;
        clearGridCellClasses($cal);
        srcElement.parentElement.className = 'active';
        return false;
    });
}

function buildCalendar(month, calendarCtrl) {
    const currentDay = calendarCtrl.getCurrentDay();
    const calendarHtml =  `
        <zwl-calendar>
            <section class="day-view">
                <p class="day-name">
                    ${currentDay.dayName}
                </p>
                <p class="day-number">
                    ${currentDay.dayNumber}
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
                    <thead>${buildMonthTableHeader()}</thead>
                    <tbody class="month-table-body">
                        ${buildMonthTableBody(month, currentDay)}
                    </tbody>
                </table>
            <section>
        </zwl-calendar>
    `;
    return calendarHtml;
}

function buildMonthTableHeader() {
    const headerHtml = DAYS
        .map(dayName => dayName.charAt(0))
        .reduce((prev, curr) => prev + `<th>${curr}</th>`, '');
    return headerHtml;
}

function buildMonthTableBody(month, day) {
    const rows = month.grid.map(week => {
        const cells = week.map(dayNumber => {
            const isActiveDay = isDay(month, dayNumber, day);
            return `
                <td class="${isActiveDay ? 'active' : ''}">
                    ${dayNumber ? `<a href="#">${dayNumber}</a>` : ''}
                </td>
            `;
        });
        return `<tr>${cells.join('')}</tr>`;
    });
    return rows.join('');
}

function isDay(month, dayNumber, day) {
    return month.year === day.year
        && month.monthIndex === day.monthIndex
        && dayNumber === day.dayNumber;
}

function CalendarDOM(root) {
    this.root = root;
    this.dayName = root.getElementsByClassName('day-name')[0];
    this.dayNumber = root.getElementsByClassName('day-number')[0];
    this.previousMonthLink = root.getElementsByClassName('prev-month')[0];
    this.nextMonthLink = root.getElementsByClassName('next-month')[0];
    this.currentMonthTitle = root.getElementsByClassName('current-month')[0];
    this.currentYearTitle = root.getElementsByClassName('current-year')[0];
    this.monthTableBody = root.getElementsByClassName('month-table-body')[0];
    this.getGridCells = () => this.monthTableBody.getElementsByTagName('td');
}

function changeMonth($cal, newMonth, calendarCtrl) {
    $cal.currentMonthTitle.innerHTML = newMonth.monthName;
    $cal.currentYearTitle.innerHTML = newMonth.year;
    $cal.monthTableBody.innerHTML = buildMonthTableBody(newMonth, calendarCtrl.getCurrentDay());
}

function clearGridCellClasses($cal) {
    const cells = $cal.getGridCells();
    for (let i = 0; i < cells.length; i++) {
        cells[i].className = '';
    }
}
