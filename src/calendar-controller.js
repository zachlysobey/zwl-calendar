import {MONTHS as months} from './calendar-constants';

export function getMonth(monthIndex) {
    return new MonthModel(monthIndex);
}

function MonthModel(monthIndex) {
    this.month = months[monthIndex];
}
