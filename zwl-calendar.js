var zwlCalendar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;

	__webpack_require__(1);

	var _calendarController = __webpack_require__(2);

	var _calendarController2 = _interopRequireDefault(_calendarController);

	var _calendarConstants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(8);

	function init(id) {
	    var calendarCtrl = new _calendarController2.default();
	    var now = new Date();

	    var currentMonth = calendarCtrl.getMonth(now.getMonth(), now.getFullYear());

	    calendarCtrl.setCurrentDay(now.getDate(), now.getMonth(), now.getFullYear());

	    var calendarElement = document.getElementById(id);

	    calendarElement.innerHTML = buildCalendar(currentMonth, calendarCtrl);

	    var $cal = new CalendarDOM(calendarElement);

	    document.addEventListener('keyup', function (event) {
	        // TODO prevent action if input or textarea is focused
	        var arrowKeyCodes = { left: 37, right: 39 };
	        var keyCode = event.which || event.keyCode;
	        if (keyCode === arrowKeyCodes.left) {
	            changeMonth($cal, calendarCtrl.previousMonth(), calendarCtrl);
	        }
	        if (keyCode === arrowKeyCodes.right) {
	            changeMonth($cal, calendarCtrl.nextMonth(), calendarCtrl);
	        }
	    });

	    $cal.previousMonthLink.addEventListener('click', function () {
	        changeMonth($cal, calendarCtrl.previousMonth(), calendarCtrl);
	        return false;
	    });

	    $cal.nextMonthLink.addEventListener('click', function () {
	        changeMonth($cal, calendarCtrl.nextMonth(), calendarCtrl);
	        return false;
	    });

	    $cal.monthTableBody.addEventListener('click', function (event) {
	        var srcElement = event.srcElement;
	        if (srcElement.tagName !== 'A') {
	            return true;
	        }
	        var dayNumber = srcElement.innerHTML;
	        calendarCtrl.setCurrentDay(Number(dayNumber));
	        var currentDay = calendarCtrl.getCurrentDay();
	        $cal.dayName.innerHTML = currentDay.dayName;
	        $cal.dayNumber.innerHTML = currentDay.dayNumber;
	        clearGridCellClasses($cal);
	        srcElement.parentElement.className = 'active';
	        return false;
	    });
	}

	function buildCalendar(month, calendarCtrl) {
	    var currentDay = calendarCtrl.getCurrentDay();
	    var calendarHtml = '\n        <zwl-calendar>\n            <section class="day-view">\n                <p class="day-name">\n                    ' + currentDay.dayName + '\n                </p>\n                <p class="day-number">\n                    ' + currentDay.dayNumber + '\n                </p>\n            </section>\n            <section class="month-view">\n                <header class="month-navigation">\n                    <a href="#" class="prev-month">&lt;</a>\n                    <span class="current-month">\n                        ' + month.monthName + '\n                    </span>\n                    <span class="current-year">\n                        ' + month.year + '\n                    </span>\n                    <a href="#" class="next-month">&gt;</a>\n                </header>\n                <table class="month-table">\n                    <thead>' + buildMonthTableHeader() + '</thead>\n                    <tbody class="month-table-body">\n                        ' + buildMonthTableBody(month, currentDay) + '\n                    </tbody>\n                </table>\n            <section>\n        </zwl-calendar>\n    ';
	    return calendarHtml;
	}

	function buildMonthTableHeader() {
	    var headerHtml = _calendarConstants.DAYS.map(function (dayName) {
	        return dayName.charAt(0);
	    }).reduce(function (prev, curr) {
	        return prev + ('<th>' + curr + '</th>');
	    }, '');
	    return headerHtml;
	}

	function buildMonthTableBody(month, day) {
	    var rows = month.grid.map(function (week) {
	        var cells = week.map(function (dayNumber) {
	            var isActiveDay = isDay(month, dayNumber, day);
	            return '\n                <td class="' + (isActiveDay ? 'active' : '') + '">\n                    ' + (dayNumber ? '<a href="#">' + dayNumber + '</a>' : '') + '\n                </td>\n            ';
	        });
	        return '<tr>' + cells.join('') + '</tr>';
	    });
	    return rows.join('');
	}

	function isDay(month, dayNumber, day) {
	    return month.year === day.year && month.monthIndex === day.monthIndex && dayNumber === day.dayNumber;
	}

	function CalendarDOM(root) {
	    var _this = this;

	    this.root = root;
	    this.dayName = root.getElementsByClassName('day-name')[0];
	    this.dayNumber = root.getElementsByClassName('day-number')[0];
	    this.previousMonthLink = root.getElementsByClassName('prev-month')[0];
	    this.nextMonthLink = root.getElementsByClassName('next-month')[0];
	    this.currentMonthTitle = root.getElementsByClassName('current-month')[0];
	    this.currentYearTitle = root.getElementsByClassName('current-year')[0];
	    this.monthTableBody = root.getElementsByClassName('month-table-body')[0];
	    this.getGridCells = function () {
	        return _this.monthTableBody.getElementsByTagName('td');
	    };
	}

	function changeMonth($cal, newMonth, calendarCtrl) {
	    $cal.currentMonthTitle.innerHTML = newMonth.monthName;
	    $cal.currentYearTitle.innerHTML = newMonth.year;
	    $cal.monthTableBody.innerHTML = buildMonthTableBody(newMonth, calendarCtrl.getCurrentDay());
	}

	function clearGridCellClasses($cal) {
	    var cells = $cal.getGridCells();
	    for (var i = 0; i < cells.length; i++) {
	        cells[i].className = '';
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/*eslint-disable */

	/**
	 * Attribution: @link http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
	 * Browser support table: @link http://kangax.github.io/compat-table/es6/#Number.isInteger
	 */
	Number.isInteger = Number.isInteger || function (value) {
	  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = CalendarController;

	var _monthModel = __webpack_require__(3);

	var _dayModel = __webpack_require__(5);

	var _dateValidator = __webpack_require__(7);

	function CalendarController() {

	    var currentDay = undefined;
	    var currentMonth = undefined;
	    var currentYear = undefined;

	    this.getMonth = getMonth;
	    this.nextMonth = nextMonth;
	    this.previousMonth = previousMonth;
	    this.setCurrentDay = setCurrentDay;
	    this.getCurrentDay = getCurrentDay;

	    function getMonth(monthIndex, year) {
	        (0, _dateValidator.validateMonthIndex)(monthIndex);
	        (0, _dateValidator.validateYear)(year);
	        currentMonth = monthIndex;
	        currentYear = year;
	        return new _monthModel.MonthModel(monthIndex, year);
	    }

	    function nextMonth() {
	        if (typeof currentMonth === 'undefined') {
	            throw new Error('Can not call nextMonth when no current month set');
	        }
	        if (currentMonth === 11) {
	            return this.getMonth(0, currentYear + 1);
	        }
	        return this.getMonth(currentMonth + 1, currentYear);
	    }

	    function previousMonth() {
	        if (typeof currentMonth === 'undefined') {
	            throw new Error('Can not call previousMonth when no current month set');
	        }
	        if (currentMonth === 0) {
	            return this.getMonth(11, currentYear - 1);
	        }
	        return this.getMonth(currentMonth - 1, currentYear);
	    }

	    function setCurrentDay(dayNumber) {
	        var monthIndex = arguments.length <= 1 || arguments[1] === undefined ? currentMonth : arguments[1];
	        var year = arguments.length <= 2 || arguments[2] === undefined ? currentYear : arguments[2];

	        (0, _dateValidator.validateDay)(dayNumber);
	        (0, _dateValidator.validateMonthIndex)(monthIndex);
	        (0, _dateValidator.validateYear)(year);
	        currentDay = new _dayModel.DayModel(dayNumber, monthIndex, year);
	    }

	    function getCurrentDay() {
	        if (!currentDay) {
	            throw new Error();
	        }
	        return currentDay;
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MonthModel = MonthModel;

	var _calendarConstants = __webpack_require__(4);

	var _dayModel = __webpack_require__(5);

	var _calendarGridBuilder = __webpack_require__(6);

	function MonthModel(monthIndex, year) {
	    this.monthIndex = monthIndex;
	    this.monthName = _calendarConstants.MONTHS[monthIndex];
	    this.year = year;

	    var dayCount = getDayCount(monthIndex, year);
	    var dayIndex = new Date(year, monthIndex, 1).getDay();
	    this.grid = (0, _calendarGridBuilder.buildCalendarGrid)(dayCount, dayIndex);
	}

	MonthModel.prototype.getDay = function (dayNumber) {
	    return new _dayModel.DayModel(dayNumber, this.monthIndex, this.year);
	};

	function getDayCount(monthIndex, year) {
	    var dayCount = _calendarConstants.DAY_COUNT_PER_MONTH[monthIndex];
	    var isFebruary = monthIndex === 1;
	    if (isFebruary && isLeapYear(year)) {
	        return dayCount + 1;
	    }
	    return dayCount;
	}

	// Taken from: http://stackoverflow.com/a/16353241/363701
	function isLeapYear(year) {
	    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MONTHS = exports.MONTHS = Object.freeze(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

	var DAYS = exports.DAYS = Object.freeze(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

	var DAY_COUNT_PER_MONTH = exports.DAY_COUNT_PER_MONTH = Object.freeze([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DayModel = DayModel;

	var _calendarConstants = __webpack_require__(4);

	function DayModel(dayNumber, monthIndex, year) {
	    var dateObject = new Date(year, monthIndex, dayNumber);
	    this.dayName = _calendarConstants.DAYS[dateObject.getDay()];
	    this.dayInitial = this.dayName.charAt(0);
	    this.dayNumber = dayNumber;
	    this.monthIndex = monthIndex;
	    this.year = year;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.buildCalendarGrid = buildCalendarGrid;
	function buildCalendarGrid(numberOfDays, firstDayIndex) {
	    var grid = [];
	    var numberOfWeeks = Math.ceil((numberOfDays + firstDayIndex) / 7);
	    for (var i = 0; i < numberOfWeeks; i++) {
	        var startDay = 1 + i * 7 - firstDayIndex;
	        grid.push(buildRow(startDay, firstDayIndex, numberOfDays));
	    }
	    return grid;
	}

	function buildRow(start, firstDayIndex, maxDayNumber) {
	    var row = [];
	    for (var i = 0; i < 7; i++) {
	        var dayNumber = start + i;
	        if (dayNumber < 1) {
	            row.push(null);
	        } else if (dayNumber <= maxDayNumber) {
	            row.push(dayNumber);
	        } else {
	            row.push(null);
	        }
	    }
	    return row;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.validateYear = validateYear;
	exports.validateMonthIndex = validateMonthIndex;
	exports.validateDay = validateDay;

	__webpack_require__(1);

	function validateYear(year) {
	    if (!Number.isInteger(year)) {
	        throw new Error('Year must be an integer. Found ' + year);
	    }
	}

	function validateMonthIndex(monthIndex) {
	    if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
	        throw new Error('Month index must be an integer between 0 - 11. Found ' + monthIndex);
	    }
	}

	function validateDay(dayNumber) {
	    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) {
	        throw new Error('Day number must be an integer between 1 - 31. Found ' + dayNumber);
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "zwl-calendar {\n  display: block;\n  border: 1px solid #333;\n  width: 500px;\n  height: 220px;\n  font-family: Helvetica, Arial, sans-serif;\n  text-align: center; }\n  zwl-calendar .day-view {\n    width: 200px;\n    height: 220px;\n    float: left;\n    font-weight: bold; }\n  zwl-calendar .month-view {\n    width: 300px;\n    height: 220px;\n    float: right; }\n  zwl-calendar .day-name {\n    margin-top: 10px; }\n  zwl-calendar .day-number {\n    font-size: 100px;\n    color: rgba(50, 50, 50, 0.8);\n    text-shadow: 1px 4px 6px #def, 0 0 0 #000, 1px 4px 6px #def;\n    margin: 0;\n    line-height: 140px; }\n  zwl-calendar .month-navigation {\n    margin-top: 10px;\n    margin-bottom: 20px; }\n    zwl-calendar .month-navigation .prev-month,\n    zwl-calendar .month-navigation .next-month {\n      text-decoration: none;\n      color: #333; }\n    zwl-calendar .month-navigation .prev-month {\n      margin-left: 1em;\n      float: left; }\n    zwl-calendar .month-navigation .next-month {\n      margin-right: 1em;\n      float: right; }\n  zwl-calendar .month-table {\n    color: #333;\n    text-decoration: none;\n    width: 100%; }\n    zwl-calendar .month-table td.active {\n      background: red; }\n    zwl-calendar .month-table a {\n      color: #333;\n      text-decoration: none;\n      display: block;\n      font-weight: bold; }\n    zwl-calendar .month-table a:hover {\n      background: rgba(255, 0, 0, 0.2); }\n    zwl-calendar .month-table .active a {\n      color: white; }\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);