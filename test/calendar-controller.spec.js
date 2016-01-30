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
            const invalidDateIndicies = [undefined, null, 'string', {}, [], -1, 12, 3.5, 111];
            invalidDateIndicies.forEach(index => {
                expect(() => calendarCtrl.getMonth(index, 2015)).toThrow();
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

        it('should return the next month object', () => {
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

});
