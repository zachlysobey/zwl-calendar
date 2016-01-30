/**
 * Attribution: @link http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
 * Browser support table: @link http://kangax.github.io/compat-table/es6/#Number.isInteger
 */
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};
