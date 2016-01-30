import * as calendarCtrl from '../src/calendar-controller';

describe('calendar controller', () => {

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

});
