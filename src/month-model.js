import {MONTHS} from './calendar-constants';
import {DayModel} from './day-model';
import {buildCalendarGrid as buildGrid} from './calendar-grid-builder';

export function MonthModel(monthIndex, year) {
    this.monthIndex = monthIndex;
    this.monthName = MONTHS[monthIndex];
    this.year = year;
    this.grid = buildGrid(31, (new Date(year, monthIndex, 1)).getDay());
}

MonthModel.prototype.getDay = function(dayNumber) {
    return new DayModel(dayNumber, this.monthIndex, this.year);
};
