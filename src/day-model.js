import {DAYS} from './calendar-constants';

export function DayModel(dayNumber, monthIndex, year) {
    const dateObject = new Date(year, monthIndex, dayNumber);
    this.dayName = DAYS[dateObject.getDay()];
    this.dayInitial = this.dayName.charAt(0);
    this.dayNumber = dayNumber;
    this.monthIndex = monthIndex;
    this.year = year;
}
