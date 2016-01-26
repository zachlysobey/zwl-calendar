function MockDocument () {}

MockDocument.prototype.getElementById = function(id) {
    return new MockElement();
}

MockDocument.prototype = (function () {

    return {
        getElementById: getElementById
    }

    function getElementById(id) {
        if (!getElementById.cache) {
            getElementById.cache = {};
        }
        if (!getElementById.cache[id]) {
            getElementById.cache[id] = new MockElement();
        }
        return getElementById.cache[id];
    }
})();

function MockElement () {}

module.exports = MockDocument;
