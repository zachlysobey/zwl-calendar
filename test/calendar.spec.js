import * as zwlCalendar from '../src/calendar';

describe('calendar widget', () => {

    it('should have an init method', () => {
        expect(typeof zwlCalendar.init).toEqual('function');
    });

    it('should insert a calendar object into the specified id', () => {
        const id = 'some-id';
        const el = addElementToDOMWithId(id);

        zwlCalendar.init(id);

        expect(el.getElementsByTagName('zwl-calendar')[0]).toBeTruthy();
    });

    function addElementToDOMWithId(id) {
        const el = document.createElement('div');
        el.id = id;
        document.body.appendChild(el);
        return el;
    }

});
