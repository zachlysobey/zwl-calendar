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

            it('should have multi-dimensional array representing the grid of weeks/days', () => {
                const month = calendarCtrl.getMonth(0, 2016);
                expect(month.grid).toEqual([
                    [null, null, null, null, null, 1, 2],
                    [3,  4,  5,  6,  7,  8,  9],
                    [10, 11, 12, 13, 14, 15, 16],
                    [17, 18, 19, 20, 21, 22, 23],
                    [24, 25, 26, 27, 28, 29, 30],
                    [31, null, null, null, null, null, null]
                ]);
            });

            it('should build a grid with 30 days starting on Fri for Apr2016', () => {
                const month = calendarCtrl.getMonth(3, 2016);
                expect(month.grid).toEqual([
                    [null, null, null, null, null, 1, 2],
                    [3,  4,  5,  6,  7,  8,  9],
                    [10, 11, 12, 13, 14, 15, 16],
                    [17, 18, 19, 20, 21, 22, 23],
                    [24, 25, 26, 27, 28, 29, 30]
                ]);
            });

            it('should account adjust February day count in leap year', () => {
                const februaryNotLeapYear = calendarCtrl.getMonth(1, 2015);
                const februaryInLeapYear = calendarCtrl.getMonth(1, 2016);

                expect(februaryNotLeapYear.grid).toEqual([
                    [1, 2, 3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19, 20, 21],
                    [22, 23, 24, 25, 26, 27, 28]
                ]);

                expect(februaryInLeapYear.grid).toEqual([
                    [null, 1, 2, 3, 4, 5, 6],
                    [7, 8, 9, 10, 11, 12, 13],
                    [14, 15, 16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25, 26, 27],
                    [28, 29, null, null, null, null, null]
                ]);
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

    describe('current day methods', () => {

        it('should have methods setCurrentDay & getCurrentDay', () => {
            expect(typeof calendarCtrl.setCurrentDay).toEqual('function');
            expect(typeof calendarCtrl.getCurrentDay).toEqual('function');
        });

        describe('getCurrentDay()', () => {
            it('should throw error if setCurrentDay() has not been called', () => {
                expect(() => calendarCtrl.getCurrentDay()).toThrow();
            });
        });

        it('should throw an Error if 1st argument (day number) is not an integer 1 - 31', () => {
            const invalidDayNumbers = [undefined, null, 'string', {}, [], -1, 32, 3.5, 123];
            invalidDayNumbers.forEach(dayNumber => {
                expect(() => calendarCtrl.setCurrentDay(dayNumber)).toThrow();
            });
        });

        it('should throw an Error if 2nd arg is not a valid monthIndex', () => {
            const dayNumber = 1;
            const invalidMonthIndicies = [undefined, null, 'string', {}, [], -1, 12, 3.5, 111];
            invalidMonthIndicies.forEach(monthIndex => {
                expect(() => calendarCtrl.setCurrentDay(dayNumber, monthIndex)).toThrow();
            });
        });

        it('should throw an Error if 3rd arg is not a valid year', () => {
            const dayNumber = 1;
            const monthIndex = 3;
            const invalidYears = [undefined, null, 'string', {}, [], 3.5];
            invalidYears.forEach(year => {
                expect(() => calendarCtrl.setCurrentDay(dayNumber, monthIndex, year)).toThrow();
            });
        });

        it('should return an object representing the day', () => {
            calendarCtrl.setCurrentDay(1, 0, 2015);
            expect(calendarCtrl.getCurrentDay(1, 0, 2015)).toEqual(jasmine.objectContaining({
                dayNumber: 1,
                dayName: 'Thursday',
                dayInitial: 'T',
                monthIndex: 0,
                year: 2015
            }));

            calendarCtrl.setCurrentDay(31, 0, 2016);
            expect(calendarCtrl.getCurrentDay()).toEqual(jasmine.objectContaining({
                dayNumber: 31,
                dayName: 'Sunday',
                dayInitial: 'S',
                monthIndex: 0,
                year: 2016
            }));
        });
    });

});
