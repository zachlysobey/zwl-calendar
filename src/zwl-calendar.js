'use strict';

export function init(id, document = this.document) {
    const calendarElement = document.getElementById(id);
    calendarElement.innerHTML = '(Calendar Widget)';
}
