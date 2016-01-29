import * as test from './calendar-controller';

export function init(id) {
    const calendarElement = document.getElementById(id);
    calendarElement.innerHTML = test.test();
}
