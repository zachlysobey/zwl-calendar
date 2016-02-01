import {MONTHS, DAY_COUNT_PER_MONTH} from './calendar-constants';
import {DayModel} from './day-model';
import {buildCalendarGrid as buildGrid} from './calendar-grid-builder';

export function MonthModel(monthIndex, year) {
    this.monthIndex = monthIndex;
    this.monthName = MONTHS[monthIndex];
    this.year = year;

    const dayCount = getDayCount(monthIndex, year);
    const dayIndex = (new Date(year, monthIndex, 1)).getDay();
    this.grid = buildGrid(dayCount, dayIndex);
}

MonthModel.prototype.getDay = function(dayNumber) {
    return new DayModel(dayNumber, this.monthIndex, this.year);
};

function getDayCount(monthIndex, year) {
    const dayCount = DAY_COUNT_PER_MONTH[monthIndex];
    const isFebruary = monthIndex === 1;
    if (isFebruary && isLeapYear(year)) {
        return dayCount + 1;
    }
    return dayCount;
}

// Taken from: http://stackoverflow.com/a/16353241/363701
function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
