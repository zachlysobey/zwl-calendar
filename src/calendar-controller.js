import {MONTHS as months} from './calendar-constants';

export default function CalendarController() {

    let currentMonth;

    this.getMonth = function(monthIndex) {
        currentMonth = monthIndex;
        return new MonthModel(monthIndex);
    };

    this.nextMonth = function() {
        if (typeof currentMonth === 'undefined') {
            throw new Error('Can not call nextMonth when no current month set');
        }
        return this.getMonth(currentMonth + 1);
    };

    function MonthModel(monthIndex) {
        this.month = months[monthIndex];
    }
}
