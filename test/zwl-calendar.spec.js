/* global describe, beforeEach, it, expect */

describe('zwl-calendar.js', () => {
    const zwlCalendar = require('../build/zwl-calendar');

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
