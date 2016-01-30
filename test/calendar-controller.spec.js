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

        it('should return an object with month property', () => {
            expect(calendarCtrl.getMonth(0).month).toEqual('January');
            expect(calendarCtrl.getMonth(1).month).toEqual('February');
            expect(calendarCtrl.getMonth(11).month).toEqual('December');
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

            expect(calendarCtrl.nextMonth().month).toEqual('February');
            expect(calendarCtrl.nextMonth().month).toEqual('March');
        });

    });

});
