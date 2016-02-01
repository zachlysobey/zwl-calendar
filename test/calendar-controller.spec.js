import CalendarController from '../src/calendar-controller';

describe('calendar controller', () => {

    let calendarCtrl;

    beforeEach(() => {
        calendarCtrl = new CalendarController();
    });

    describe('getMonth() method', () => {

        it('should exist', () => {
            expect(typeof calendarCtrl.getMonth).toEqual('function');
        });

        it('should throw Error if 1st argument not an integer 0 - 11', () => {
            const invalidMonthIndicies = [undefined, null, 'string', {}, [], -1, 12, 3.5, 111];
            invalidMonthIndicies.forEach(index => {
                expect(() => calendarCtrl.getMonth(index, 2015)).toThrow();
            });
        });

        it('should throw an Error if 2nd argument is not an integer', () => {
            const invalidYears = [undefined, null, 'string', {}, [], 3.5];
            invalidYears.forEach(year => {
                expect(() => calendarCtrl.getMonth(1, year)).toThrow();
            });
        });

        it('should return an object with monthName and year properties', () => {
            expect(calendarCtrl.getMonth(0, 2015)).toEqual(jasmine.objectContaining({
                monthName: 'January',
                year: 2015
            }));
            expect(calendarCtrl.getMonth(1, 1994)).toEqual(jasmine.objectContaining({
                monthName: 'February',
                year: 1994
            }));
            expect(calendarCtrl.getMonth(11, 3125)).toEqual(jasmine.objectContaining({
                monthName: 'December',
                year: 3125
            }));
        });

    });

    describe('nextMonth() method', () => {

        it('should exist', () => {
            expect(typeof calendarCtrl.nextMonth).toEqual('function');
        });

        it('should throw error if month has never been retrieved', () => {
            expect(() => calendarCtrl.nextMonth()).toThrow();
        });

        it('should return an object representing the month', () => {
            calendarCtrl.getMonth(0, 2015);

            expect(calendarCtrl.nextMonth()).toEqual(jasmine.objectContaining({
                monthName: 'February',
                year: 2015
            }));

            expect(calendarCtrl.nextMonth()).toEqual(jasmine.objectContaining({
                monthName: 'March',
                year: 2015
            }));
        });

        it('should roll over to the next year', () => {
            calendarCtrl.getMonth(11, 2015);
            expect(calendarCtrl.nextMonth()).toEqual(jasmine.objectContaining({
                monthName: 'January',
                year: 2016
            }));
        });

        describe('MonthModel', () => {

            it('should have a method .getDay(dayNumber)', () => {
                const month = calendarCtrl.getMonth(11, 2015);
                expect(month.getDay(1)).toEqual(jasmine.objectContaining({
                    dayNumber: 1,
                    monthIndex: 11,
                    year: 2015
                }));
            });

        });

    });

    describe('previousMonth() method', () => {

        it('should exist', () => {
            expect(typeof calendarCtrl.previousMonth).toEqual('function');
        });

        it('should throw error if month has never been retrieved', () => {
            expect(() => calendarCtrl.previousMonth()).toThrow();
        });

        it('should return the previous month object', () => {
            calendarCtrl.getMonth(11, 2015);
            expect(calendarCtrl.previousMonth()).toEqual(jasmine.objectContaining({
                monthName: 'November',
                year: 2015
            }));
            expect(calendarCtrl.previousMonth()).toEqual(jasmine.objectContaining({
                monthName: 'October',
                year: 2015
            }));
        });

        it('should roll over to the previous year', () => {
            calendarCtrl.getMonth(0, 2015);
            expect(calendarCtrl.previousMonth()).toEqual(jasmine.objectContaining({
                monthName: 'December',
                year: 2014
            }));
        });

    });

    describe('getDay() method', () => {

        it('should exist', () => {
            expect(typeof calendarCtrl.getDay).toEqual('function');
        });

        it('should throw an Error if 1st argument (day number) is not an integer 1 - 31', () => {
            const invalidDayNumbers = [undefined, null, 'string', {}, [], -1, 32, 3.5, 123];
            invalidDayNumbers.forEach(dayNumber => {
                expect(() => calendarCtrl.getDay(dayNumber)).toThrow();
            });
        });

        it('should throw an Error if 2nd arg is not a valid monthIndex', () => {
            const dayNumber = 1;
            const invalidMonthIndicies = [undefined, null, 'string', {}, [], -1, 12, 3.5, 111];
            invalidMonthIndicies.forEach(monthIndex => {
                expect(() => calendarCtrl.getDay(dayNumber, monthIndex)).toThrow();
            });
        });

        it('should throw an Error if 3rd arg is not a valid year', () => {
            const dayNumber = 1;
            const monthIndex = 3;
            const invalidYears = [undefined, null, 'string', {}, [], 3.5];
            invalidYears.forEach(year => {
                expect(() => calendarCtrl.getDay(dayNumber, monthIndex, year)).toThrow();
            });
        });

        it('should return an object representing the day', () => {
            expect(calendarCtrl.getDay(1, 0, 2015)).toEqual(jasmine.objectContaining({
                dayNumber: 1,
                dayName: 'Thursday',
                dayInitial: 'T',
                monthIndex: 0,
                year: 2015
            }));

            expect(calendarCtrl.getDay(31, 0, 2016)).toEqual(jasmine.objectContaining({
                dayNumber: 31,
                dayName: 'Sunday',
                dayInitial: 'S',
                monthIndex: 0,
                year: 2016
            }));
        });

    });

});
