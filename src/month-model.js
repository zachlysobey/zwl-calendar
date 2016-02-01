import {MONTHS, DAY_COUNT_PER_MONTH} from './calendar-constants';
import {DayModel} from './day-model';
import {buildCalendarGrid as buildGrid} from './calendar-grid-builder';

export function MonthModel(monthIndex, year) {
    this.monthIndex = monthIndex;
    this.monthName = MONTHS[monthIndex];
    this.year = year;
    const dayCount = DAY_COUNT_PER_MONTH[monthIndex];
    this.grid = buildGrid(dayCount, (new Date(year, monthIndex, 1)).getDay());
}

MonthModel.prototype.getDay = function(dayNumber) {
    return new DayModel(dayNumber, this.monthIndex, this.year);
};
