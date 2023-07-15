'use strict';

window.moment = require("moment");
window.momentJalaali = require("moment-jalaali");

/**
 * DateHelper
 */
function DateHelper() { }
module.exports = DateHelper;

//
// To Persian Date
//
DateHelper.toPersianDate = function toPersianDate(value, format, locale) {
    if (!value) {
        return '';
    }

    return momentJalaali(value)
        .locale(locale || 'fa')
        .format(format || 'jYYYY/jMM/jDD');
};

//
// To Persian Date
//
DateHelper.toPersianDateLong = function toPersianDateLong(value, locale) {
    return DateHelper.toPersianDate(value, 'jYYYY-jMM-jDD HH:mm:SS', locale);
};

//
// To Persian Date
//
DateHelper.toPersianDateLongHM = function toPersianDateLong(value, locale) {
    return DateHelper.toPersianDate(value, 'jYYYY/jMM/jDD - HH:mm', locale);
};

//
// To Persian hours min
//
DateHelper.toPersianDateHM = function toPersianDateHM(value, locale) {
    return DateHelper.toPersianDate(value, 'H:mm', locale);
};

//
// To Persian hours min
//
DateHelper.toServerDateHM = function toServerDateHM(value) {
    let serverTime =
        ("0" + value.getHours()).slice(-2) + ":" +
        ("0" + value.getMinutes()).slice(-2);

    return serverTime;
};