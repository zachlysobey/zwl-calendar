var Test = require('./fixtures/test-framework');
var MockDocument = require('./fixtures/mock-document');

var zwlCalendar = require('../build/zwl-calendar');

(function testSuite() {

    var document = new MockDocument();
    var zwlCalendarInit = zwlCalendar.init.bind({document: document});

    new Test('it should insert some html', function () {

        zwlCalendarInit('zwl-calendar');

        var targetElement = document.getElementById('zwl-calendar');

        Test.expectToBeTruthy(targetElement.innerHTML);

    });

})();
