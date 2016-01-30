import * as calendarController from '../src/calendar-controller';

describe('calendar controller', () => {

    it('should return some text', () => {
        expect(calendarController.test()).toEqual('(Calendar Widget)');
    });

});
