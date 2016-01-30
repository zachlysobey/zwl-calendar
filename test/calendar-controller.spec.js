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

        it('should throw Error if not passed an integer 0 - 11', () => {
            const invalidDateIndicies = [undefined, null, 'string', {}, [], -1, 12, 3.5, 111];
            invalidDateIndicies.forEach(index => {
                expect(() => calendarCtrl.getMonth(index)).toThrow();
            });
        });

        it('should return an object with month property', () => {
            expect(calendarCtrl.getMonth(0).monthName).toEqual('January');
            expect(calendarCtrl.getMonth(1).monthName).toEqual('February');
            expect(calendarCtrl.getMonth(11).monthName).toEqual('December');
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
            calendarCtrl.getMonth(0);
            expect(calendarCtrl.nextMonth().monthName).toEqual('February');
            expect(calendarCtrl.nextMonth().monthName).toEqual('March');

            calendarCtrl.getMonth(11);
            expect(calendarCtrl.nextMonth().monthName).toEqual('January');
        });

    });

    describe('previousMonth() method', () => {

        it('should exist', () => {
            expect(typeof calendarCtrl.previousMonth).toEqual('function');
        });

        it('should throw error if month has never been retrieved', () => {
            expect(() => calendarCtrl.previousMonth()).toThrow();
        });

        it('should return the next month object', () => {
            calendarCtrl.getMonth(11);
            expect(calendarCtrl.previousMonth().monthName).toEqual('November');
            expect(calendarCtrl.previousMonth().monthName).toEqual('October');

            calendarCtrl.getMonth(0);
            expect(calendarCtrl.previousMonth().monthName).toEqual('December');
        });

    });

});
