import i18n from '@/locales/lang';

export function UTCToLocalTime(utcTime: string | Date): Date | undefined {
    if (!utcTime) return undefined; // return a date object with current time if utcTime is not provided
    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    }
    const localTime = new Date(utcTime.getTime());
    return localTime;
}

/**
 * Description Convert UTC time to local time
 *    the timezone are automatically detected by the browser
 * @param {any} utcTime:Date | string
 * @returns {any}
 */
export function UTCToLocalTimeString(
    utcTime: string | Date,
    format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
    if (!utcTime) return '';

    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    } else {
        utcTime = new Date(utcTime.getTime());
    }
    // convert to local time

    const localTime = new Date(utcTime.getTime());
    return formatDateTime(localTime, format);
}

function formatDateTime(time: Date, format: string = 'YYYY-MM-DD HH:mm:ss') {
    const year = time.getFullYear().toString();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    const formattedTime = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    return formattedTime;
}

export function GetLocalTimeDelta(utcTime: string | Date): number {
    if (typeof utcTime === 'string') {
        utcTime = new Date(utcTime);
    }

    const currentLocalTime = new Date();

    const timeDeltaInMilliseconds =
        utcTime.getTime() - currentLocalTime.getTime();

    const timeDeltaInSeconds = Math.round(timeDeltaInMilliseconds / 1000);
    return timeDeltaInSeconds;
}

export function GetLocalTimeDeltaStrBrief(time: Date | string): string {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    const t = (i18n.global as any).t;
    const now = Date.now();
    const timeDelta = (time.getTime() - now) / 1000; // seconds
    const absDelta = Math.abs(timeDelta);
    const isPast = timeDelta < 0;

    const thresholds = [60, 3600, 86400, 604800]; // minutes, hours, days, weeks
    const units = ['seconds', 'minutes', 'hours', 'days'];
    let unitIndex = thresholds.findIndex((threshold) => absDelta < threshold);
    unitIndex = unitIndex === -1 ? thresholds.length - 1 : unitIndex;

    const divisor = unitIndex === 0 ? 1 : thresholds[unitIndex - 1];
    const value = Math.floor(absDelta / divisor);

    const i18nKey = isPast
        ? `time.time_delta.${units[unitIndex]}_ago`
        : `time.time_delta.in_${units[unitIndex]}`;

    return t(i18nKey, { [units[unitIndex]]: value });
}

export function GetLocalTimeDeltaStrDetail(time: Date | string): string {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    const t = (i18n.global as any).t;
    const now = Date.now();
    const timeDelta = (time.getTime() - now) / 1000; // in seconds
    const absDelta = Math.abs(timeDelta);
    const isPast = timeDelta < 0;

    // Calculate the different parts of the time delta
    const days = Math.floor(absDelta / 86400); // in days
    const hours = Math.floor((absDelta % 86400) / 3600); // in hours
    const minutes = Math.floor((absDelta % 3600) / 60); // in minutes
    const seconds = Math.floor(absDelta % 60); // in seconds

    // Choose an appropriate display format based on the size of the time delta
    if (absDelta < 60) {
        // Less than 1 minute, display seconds
        return isPast
            ? t('time.time_delta_detail.seconds_ago', { seconds })
            : t('time.time_delta_detail.in_seconds', { seconds });
    } else {
        // Greater than or equal to 1 minute, display up to minutes
        if (absDelta < 3600) {
            // Less than 1 hour, display minutes and seconds
            return isPast
                ? t('time.time_delta_detail.minutes_seconds_ago', {
                      minutes,
                      seconds,
                  })
                : t('time.time_delta_detail.in_minutes_seconds', {
                      minutes,
                      seconds,
                  });
        } else if (absDelta < 86400) {
            // Less than 1 day, display hours and minutes
            return isPast
                ? t('time.time_delta_detail.hours_minutes_ago', {
                      hours,
                      minutes,
                  })
                : t('time.time_delta_detail.in_hours_minutes', {
                      hours,
                      minutes,
                  });
        } else {
            // Greater than or equal to 1 day, display days, hours, and minutes
            return isPast
                ? t('time.time_delta_detail.days_hours_minutes_ago', {
                      days,
                      hours,
                      minutes,
                  })
                : t('time.time_delta_detail.in_days_hours_minutes', {
                      days,
                      hours,
                      minutes,
                  });
        }
    }
}
