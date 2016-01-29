import * as test from './calendar-service';

export function init(id) {
    const calendarElement = document.getElementById(id);
    calendarElement.innerHTML = test.test();
}
