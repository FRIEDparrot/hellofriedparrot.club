"use strict";
exports.__esModule = true;
exports.GetLocalTimeDeltaStrDetail = exports.GetLocalTimeDeltaStrBrief = exports.GetLocalTimeDelta = exports.UTCToLocalTimeString = exports.UTCToLocalTime = void 0;
var lang_1 = require("@/locales/lang");
function UTCToLocalTime(utcTime) {
    if (!utcTime)
        return undefined; // return a date object with current time if utcTime is not provided
    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    }
    var localTime = new Date(utcTime.getTime());
    return localTime;
}
exports.UTCToLocalTime = UTCToLocalTime;
/**
 * Description Convert UTC time to local time
 *    the timezone are automatically detected by the browser
 * @param {any} utcTime:Date | string
 * @returns {any}
 */
function UTCToLocalTimeString(utcTime, format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    if (!utcTime)
        return '';
    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    }
    else {
        utcTime = new Date(utcTime.getTime());
    }
    // convert to local time
    var localTime = new Date(utcTime.getTime());
    return formatDateTime(localTime, format);
}
exports.UTCToLocalTimeString = UTCToLocalTimeString;
function formatDateTime(time, format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    var year = time.getFullYear().toString();
    var month = String(time.getMonth() + 1).padStart(2, '0');
    var day = String(time.getDate()).padStart(2, '0');
    var hours = String(time.getHours()).padStart(2, '0');
    var minutes = String(time.getMinutes()).padStart(2, '0');
    var seconds = String(time.getSeconds()).padStart(2, '0');
    var formattedTime = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    return formattedTime;
}
function GetLocalTimeDelta(utcTime) {
    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    }
    var currentLocalTime = new Date();
    var timeDeltaInMilliseconds = utcTime.getTime() - currentLocalTime.getTime();
    var timeDeltaInSeconds = Math.round(timeDeltaInMilliseconds / 1000);
    return timeDeltaInSeconds;
}
exports.GetLocalTimeDelta = GetLocalTimeDelta;
function GetLocalTimeDeltaStrBrief(time) {
    var _a;
    if (typeof time === 'string') {
        time = new Date(time);
    }
    var t = lang_1["default"].global.t;
    var now = Date.now();
    var timeDelta = (time.getTime() - now) / 1000; // seconds
    var absDelta = Math.abs(timeDelta);
    var isPast = timeDelta < 0;
    var thresholds = [60, 3600, 86400, 604800]; // minutes, hours, days, weeks
    var units = ['seconds', 'minutes', 'hours', 'days'];
    var unitIndex = thresholds.findIndex(function (threshold) { return absDelta < threshold; });
    unitIndex = unitIndex === -1 ? thresholds.length - 1 : unitIndex;
    var divisor = unitIndex === 0 ? 1 : thresholds[unitIndex - 1];
    var value = Math.floor(absDelta / divisor);
    var i18nKey = isPast
        ? "time.time_delta." + units[unitIndex] + "_ago"
        : "time.time_delta.in_" + units[unitIndex];
    return t(i18nKey, (_a = {}, _a[units[unitIndex]] = value, _a));
}
exports.GetLocalTimeDeltaStrBrief = GetLocalTimeDeltaStrBrief;
function GetLocalTimeDeltaStrDetail(time) {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    var t = lang_1["default"].global.t;
    var now = Date.now();
    var timeDelta = (time.getTime() - now) / 1000; // in seconds
    var absDelta = Math.abs(timeDelta);
    var isPast = timeDelta < 0;
    // Calculate the different parts of the time delta
    var days = Math.floor(absDelta / 86400); // in days
    var hours = Math.floor((absDelta % 86400) / 3600); // in hours
    var minutes = Math.floor((absDelta % 3600) / 60); // in minutes
    var seconds = Math.floor(absDelta % 60); // in seconds
    // Choose an appropriate display format based on the size of the time delta
    if (absDelta < 60) {
        // Less than 1 minute, display seconds
        return isPast
            ? t('time.time_delta_detail.seconds_ago', { seconds: seconds })
            : t('time.time_delta_detail.in_seconds', { seconds: seconds });
    }
    else {
        // Greater than or equal to 1 minute, display up to minutes
        if (absDelta < 3600) {
            // Less than 1 hour, display minutes and seconds
            return isPast
                ? t('time.time_delta_detail.minutes_seconds_ago', {
                    minutes: minutes,
                    seconds: seconds
                })
                : t('time.time_delta_detail.in_minutes_seconds', {
                    minutes: minutes,
                    seconds: seconds
                });
        }
        else if (absDelta < 86400) {
            // Less than 1 day, display hours and minutes
            return isPast
                ? t('time.time_delta_detail.hours_minutes_ago', {
                    hours: hours,
                    minutes: minutes
                })
                : t('time.time_delta_detail.in_hours_minutes', {
                    hours: hours,
                    minutes: minutes
                });
        }
        else {
            // Greater than or equal to 1 day, display days, hours, and minutes
            return isPast
                ? t('time.time_delta_detail.days_hours_minutes_ago', {
                    days: days,
                    hours: hours,
                    minutes: minutes
                })
                : t('time.time_delta_detail.in_days_hours_minutes', {
                    days: days,
                    hours: hours,
                    minutes: minutes
                });
        }
    }
}
exports.GetLocalTimeDeltaStrDetail = GetLocalTimeDeltaStrDetail;
