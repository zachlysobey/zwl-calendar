import {MONTHS as months} from './calendar-constants';
import './polyfill/number-is-integer';

export default function CalendarController() {

    let currentMonth;
    let currentYear;

    this.getMonth = getMonth;
    this.nextMonth = nextMonth;
    this.previousMonth = previousMonth;

    function getMonth(monthIndex, year) {
        validateMonthIndex(monthIndex);
        validateYear(year);
        currentMonth = monthIndex;
        currentYear = year;
        return new MonthModel(monthIndex, year);
    }

    function nextMonth() {
        if (typeof currentMonth === 'undefined') {
            throw new Error('Can not call nextMonth when no current month set');
        }
        if (currentMonth === 11) {
            return this.getMonth(0, currentYear + 1);
        }
        return this.getMonth(currentMonth + 1, currentYear);
    }

    function previousMonth() {
        if (typeof currentMonth === 'undefined') {
            throw new Error('Can not call previousMonth when no current month set');
        }
        if (currentMonth === 0) {
            return this.getMonth(11, currentYear - 1);
        }
        return this.getMonth(currentMonth - 1, currentYear);
    }

    function validateYear(year) {
        if (!Number.isInteger(year)) {
            throw new Error('Year must be an integer');
        }
    }

    function validateMonthIndex(monthIndex) {
        if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
            throw new Error('Month index must be an integer between 0 - 11');
        }
    }
}

function MonthModel(monthIndex, year) {
    this.monthName = months[monthIndex];
    this.year = year;
}
