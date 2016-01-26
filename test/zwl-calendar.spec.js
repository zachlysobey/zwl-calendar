var Test = require('./fixtures/test-framework');
var MockDocument = require('./fixtures/mock-document');

global.document = new MockDocument();

var zwlCalendar = require('../src/zwl-calendar');

(function testSuite() {

    new Test('it should insert some html', function () {

        var targetElement = document.getElementById('zwl-calendar');

        Test.expectToBeTruthy(targetElement.innerHTML);

    });

})();
