import {MonthModel} from './month-model';
import {DayModel} from './day-model';
import {validateYear, validateMonthIndex, validateDay} from './date-validator';

export default function CalendarController() {

    let currentDay;
    let currentMonth;
    let currentYear;

    this.getMonth = getMonth;
    this.nextMonth = nextMonth;
    this.previousMonth = previousMonth;
    this.setCurrentDay = setCurrentDay;
    this.getCurrentDay = getCurrentDay;

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

    function setCurrentDay(dayNumber, monthIndex = currentMonth, year = currentYear) {
        validateDay(dayNumber);
        validateMonthIndex(monthIndex);
        validateYear(year);
        currentDay = new DayModel(dayNumber, monthIndex, year);
    }

    function getCurrentDay() {
        if (!currentDay) {
            throw new Error();
        }
        return currentDay;
    }
}
