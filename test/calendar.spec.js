import * as zwlCalendar from '../src/calendar';

describe('calendar widget', () => {

    it('should have an init method', () => {
        expect(typeof zwlCalendar.init).toEqual('function');
    });

});
