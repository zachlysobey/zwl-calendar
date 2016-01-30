import CalendarController from './calendar-controller';

export function init(id) {
    const calendarCtrl = new CalendarController();
    const now = new Date();
    const calendarElement = document.getElementById(id);
    calendarElement.innerHTML = calendarCtrl.getMonth(now.getMonth);
}
