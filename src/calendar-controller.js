'use strict';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export function getMonth(monthIndex) {
    return new MonthModel(monthIndex);
}

function MonthModel(monthIndex) {
    this.month = months[monthIndex];
}
