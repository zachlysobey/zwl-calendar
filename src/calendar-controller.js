import {MONTHS as months} from './calendar-constants';

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
        return this.getMonth(currentMonth + 1);
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
