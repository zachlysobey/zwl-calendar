import CalendarController from './calendar-controller';

export function init(id) {
    const calendarCtrl = new CalendarController();
    const now = new Date();

    const calendarElement = document.getElementById(id);

    const currentMonth = calendarCtrl.getMonth(now.getMonth(), now.getFullYear());

    calendarElement.innerHTML = buildCalendar(currentMonth);

    const previousMonthLink = calendarElement.getElementsByClassName('prev-month')[0];
    const nextMonthLink = calendarElement.getElementsByClassName('next-month')[0];
    const currentMonthTitle = calendarElement.getElementsByClassName('current-month')[0];
    const currentYearTitle = calendarElement.getElementsByClassName('current-year')[0];

    previousMonthLink.addEventListener('click', () => {
        const prevMonth = calendarCtrl.previousMonth();
        currentMonthTitle.innerHTML = prevMonth.monthName;
        currentYearTitle.innerHTML = prevMonth.year;
        return false;
    });

    nextMonthLink.addEventListener('click', () => {
        const nextMonth = calendarCtrl.nextMonth();
        currentMonthTitle.innerHTML = nextMonth.monthName;
        currentYearTitle.innerHTML = nextMonth.year;
        return false;
    });
}

function buildCalendar(month) {
    return `
        <zwl-calendar>
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
            <section>
        </zwl-calendar>
    `;
}
