/* global describe, beforeEach, it, expect */

import * as zwlCalendar from '../src/calendar'

describe('calendar widget', () => {

    beforeEach(() => {
        const element = document.createElement('div');
        element.id = 'target';
        document.body.appendChild(element);
    });

    it('should insert some html', () => {
        const targetElement = document.getElementById('target');
        zwlCalendar.init('target');
        expect(targetElement.innerHTML).toEqual('(Calendar Widget)');
    });

});
