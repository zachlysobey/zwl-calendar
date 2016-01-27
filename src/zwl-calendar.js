(function (document) {
    'use strict';

    if (typeof document === 'undefined') {
        throw new Error('zwl-calendar requires a global "document" object');
    }

    const calendarElement = document.getElementById('zwl-calendar');

    calendarElement.innerHTML = '<p>(Calendar)</p>';


})(typeof document !== 'undefined' ? document : global.document);
