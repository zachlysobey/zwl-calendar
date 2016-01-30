import './polyfill/number-is-integer';

export function validateYear(year) {
    if (!Number.isInteger(year)) {
        throw new Error('Year must be an integer. Found ' + year);
    }
}

export function validateMonthIndex(monthIndex) {
    if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
        throw new Error('Month index must be an integer between 0 - 11. Found ' + monthIndex);
    }
}

export function validateDay(dayNumber) {
    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) {
        throw new Error('Day number must be an integer between 1 - 31. Found ' + dayNumber);
    }
}
