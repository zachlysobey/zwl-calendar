import {MONTHS} from './calendar-constants';
import {DayModel} from './day-model';

export function MonthModel(monthIndex, year) {
    this.monthIndex = monthIndex;
    this.monthName = MONTHS[monthIndex];
    this.year = year;
}

MonthModel.prototype.getDay = function(dayNumber) {
    return new DayModel(dayNumber, this.monthIndex, this.year);
};
