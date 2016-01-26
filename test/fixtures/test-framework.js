function Test(name, spec) {
    console.log('test:', name);
    spec();
}


Test.expectToBeTruthy = function expectToBeTruthy(statement) {
    if (!statement) {
        throw new Error('Assertion Error: expected ' + statement + ' to be truthy');
    }
    console.log('√');
}

Test.expectToBeEqual = function expectToBeEqual(a, b) {
    if (a !== b) {
        throw new Error('Assertion Error: expected ' + a + ' to equal ' + b);
    }
    console.log('√');
}


module.exports = Test;
