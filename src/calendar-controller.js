import {MONTHS as months} from './calendar-constants';
import {validateYear, validateMonthIndex, validateDay} from './date-validator';

export default function CalendarController() {

    let currentMonth;
    let currentYear;

    this.getMonth = getMonth;
    this.nextMonth = nextMonth;
    this.previousMonth = previousMonth;
    this.getDay = getDay;

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

    function getDay(dayNumber, monthIndex, year) {
        validateDay(dayNumber);
        validateMonthIndex(monthIndex);
        validateYear(year);
        return new DayModel(dayNumber);
    }
}

function MonthModel(monthIndex, year) {
    this.monthName = months[monthIndex];
    this.year = year;
}

function DayModel(dayNumber) {
    this.dayNumber = dayNumber;
}
