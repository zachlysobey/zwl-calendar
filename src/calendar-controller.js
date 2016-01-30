import {MONTHS as months} from './calendar-constants';
import './polyfill/number-is-integer';

export default function CalendarController() {

    let currentMonth;

    this.getMonth = function(monthIndex) {
        validateMonthIndex(monthIndex);
        currentMonth = monthIndex;
        return new MonthModel(monthIndex);
    };

    this.nextMonth = function() {
        if (typeof currentMonth === 'undefined') {
            throw new Error('Can not call nextMonth when no current month set');
        }
        return (currentMonth < 11) ? this.getMonth(currentMonth + 1) : this.getMonth(0);
    };

    this.previousMonth = function() {
        if (typeof currentMonth === 'undefined') {
            throw new Error('Can not call previousMonth when no current month set');
        }
        return (currentMonth > 0) ? this.getMonth(currentMonth - 1) : this.getMonth(11);
    };

    function validateMonthIndex(monthIndex) {
        if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
            throw new Error('Month index must be an integer between 0 - 11');
        }
    }

    function MonthModel(monthIndex) {
        this.month = months[monthIndex];
    }
}
