/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2022 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.

* Adobe permits you to use and modify this file solely in accordance with
* the terms of the Adobe license agreement accompanying it.
*************************************************************************/

const DATE_TIME_REGEX =
    /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvV]{1,5}|[zZOvVxX]{1,3}|S{1,3}|'(?:[^']|'')*')|[^a-zA-Z']+/g;
const ShorthandStyles$1 = ["full", "long", "medium", "short"];
function getSkeleton(skeleton, language) {
    if (ShorthandStyles$1.find(type => skeleton.includes(type))) {
        const parsed = parseDateStyle(skeleton, language);
        const result = [];
        const symbols = {
            month : 'M',
            year : 'Y',
            day : 'd'
        };
        parsed.forEach(([type, option, length]) => {
            if (type in symbols) {
                result.push(Array(length).fill(symbols[type]).join(''));
            } else if (type === 'literal') {
                result.push(option);
            }
        });
        return result.join('');
    }
    return skeleton;
}
function parseDateStyle(skeleton, language) {
    const options = {};
    const styles = skeleton.split(/\s/).filter(s => s.length);
    options.dateStyle = styles[0];
    if (styles.length > 1) options.timeStyle = styles[1];
    const testDate = new Date(2000, 2, 1, 2, 3, 4);
    const parts = new Intl.DateTimeFormat(language, options).formatToParts(testDate);
    const formattedMarch = parts.find(p => p.type === 'month').value;
    const longMarch = new Intl.DateTimeFormat(language, {month: 'long'}).formatToParts(testDate)[0].value;
    const shortMarch = new Intl.DateTimeFormat(language, {month: 'short'}).formatToParts(testDate)[0].value;
    const result = [];
    parts.forEach(({type, value}) => {
        let option;
        if (type === 'month') {
            option = {
                [formattedMarch]: skeleton === 'medium' ? 'short' : 'long',
                [longMarch]: 'long',
                [shortMarch]: 'short',
                '03': '2-digit',
                '3': 'numeric'
            }[value];
        }
        if (type === 'year') option = {'2000': 'numeric', '00': '2-digit'}[value];
        if (['day', 'hour', 'minute', 'second'].includes(type)) option = value.length === 2 ? '2-digit' : 'numeric';
        if (type === 'literal') option = value;
        if (type === 'dayPeriod') option = 'short';
        result.push([type, option, value.length]);
    });
    return result;
}
function parseDateTimeSkeleton(skeleton, language) {
    if (ShorthandStyles$1.find(type => skeleton.includes(type))) {
        return parseDateStyle(skeleton, language);
    }
    const result = [];
    skeleton.replace(DATE_TIME_REGEX, match => {
        const len = match.length;
        switch (match[0]) {
            case 'G':
                result.push(['era', len === 4 ? 'long' : len === 5 ? 'narrow' : 'short', len]);
                break;
            case 'y':
                result.push(['year', len === 2 ? '2-digit' : 'numeric', len]);
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError(
                    '`Y/u/U/r` (year) patterns are not supported, use `y` instead'
                );
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            case 'M':
            case 'L':
                result.push(['month', ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1], len]);
                break;
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.push(['day', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError(
                    '`D/F/g` (day) patterns are not supported, use `d` instead'
                );
            case 'E':
                result.push(['weekday', ['short', 'short', 'short', 'long', 'narrow', 'narrow'][len - 1], len]);
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.push(['weekday', ['short', 'long', 'narrow', 'short'][len - 4], len]);
                break;
            case 'c':
                if (len < 3 || len > 5) {
                    throw new RangeError('`c, cc, cccccc` (weekday) patterns are not supported');
                }
                result.push(['weekday', ['short', 'long', 'narrow', 'short'][len - 3], len]);
                break;
            case 'a':
                result.push(['hour12', true, 1]);
                break;
            case 'b':
            case 'B':
                throw new RangeError(
                    '`b/B` (period) patterns are not supported, use `a` instead'
                );
            case 'h':
                result.push(['hourCycle', 'h12']);
                result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'H':
                result.push(['hourCycle', 'h23', 1]);
                result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'K':
                result.push(['hourCycle', 'h11', 1]);
                result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'k':
                result.push(['hourCycle', 'h24', 1]);
                result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError(
                    '`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead'
                );
            case 'm':
                result.push(['minute', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 's':
                result.push(['second', ['numeric', '2-digit'][len - 1], len]);
                break;
            case 'S':
                result.push(['fractionalSecondDigits', len, len]);
                break;
            case 'A':
                throw new RangeError(
                    '`S/A` (millisecond) patterns are not supported, use `s` instead'
                );
            case 'O':
                result.push(['timeZoneName', len < 4 ? 'shortOffset' : 'longOffset', len]);
                result.push(['x-timeZoneName', len < 4 ? 'O' : 'OOOO', len]);
                break;
            case 'X':
            case 'x':
            case 'Z':
                result.push(['timeZoneName', 'longOffset', 1]);
                result.push(['x-timeZoneName', match, 1]);
                break;
            case 'z':
            case 'v':
            case 'V':
                throw new RangeError(
                    'z/v/V` (timeZone) patterns are not supported, use `X/x/Z/O` instead'
                );
            case '\'':
                result.push(['literal', match.slice(1, -1).replace(/''/g, '\''), -1]);
                break;
            default:
                result.push(['literal', match, -1]);
        }
        return '';
    });
    return result;
}
const twelveMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(m => new Date(2000, m, 1));
function monthNames(locale, options) {
    return twelveMonths.map(month => {
        const parts = new Intl.DateTimeFormat(locale, options).formatToParts(month);
        const m = parts.find(p => p.type === 'month');
        return m && m.value;
    });
}
function digitChars(locale) {
    return new Intl.NumberFormat(locale, {style:'decimal', useGrouping:false})
        .format(9876543210)
        .split('')
        .reverse();
}
function calendarName(locale) {
    const parts = new Intl.DateTimeFormat(locale, {era:'short'}).formatToParts(new Date());
    const era = parts.find(p => p.type === 'era')?.value;
    return era === 'هـ' ? 'islamic' : 'gregory';
}
function getDayPeriod(language) {
    const morning = new Date(2000, 1, 1, 1, 1, 1);
    const afternoon = new Date(2000, 1, 1, 16, 1, 1);
    const df = new Intl.DateTimeFormat(language, {dateStyle: 'full', timeStyle: 'full'});
    const am = df.formatToParts(morning).find(p => p.type === 'dayPeriod');
    const pm = df.formatToParts(afternoon).find(p => p.type === 'dayPeriod');
    if (!am || !pm) return null;
    return {
        regex: `(${am.value}|${pm.value})`,
        fn: (period, obj) => obj.hour += (period === pm.value) ? 12 : 0
    };
}
function offsetMS(dateObj, timeZone) {
    let tzOffset;
    try {
        tzOffset = new Intl.DateTimeFormat('en-US', {timeZone, timeZoneName: 'longOffset'}).format(dateObj);
    } catch(e) {
        return offsetMSFallback(dateObj, timeZone);
    }
    const offset = /GMT([+\-−])?(\d{1,2}):?(\d{0,2})?/.exec(tzOffset);
    if (!offset) return 0;
    const [sign, hours, minutes] = offset.slice(1);
    const nHours = isNaN(parseInt(hours)) ? 0 : parseInt(hours);
    const nMinutes = isNaN(parseInt(minutes)) ? 0 : parseInt(minutes);
    const result = ((nHours  * 60) + nMinutes) * 60 * 1000;
    return sign === '-' ? - result : result;
}
function getTimezoneOffsetFrom(otherTimezone) {
    var date = new Date();
    function objFromStr(str) {
        var array = str.replace(":", " ").split(" ");
        return {
            day: parseInt(array[0]),
            hour: parseInt(array[1]),
            minute: parseInt(array[2])
        };
    }
    var str = date.toLocaleString('en-US', { timeZone: otherTimezone, day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
    var other = objFromStr(str);
    str = date.toLocaleString('en-US', { day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
    var myLocale = objFromStr(str);
    var otherOffset = (other.day * 24 * 60) + (other.hour * 60) + (other.minute);
    var myLocaleOffset = (myLocale.day * 24 * 60) + (myLocale.hour * 60) + (myLocale.minute);
    return otherOffset - myLocaleOffset - date.getTimezoneOffset();
}
function offsetMSFallback(dateObj, timezone) {
    const timezoneOffset = getTimezoneOffsetFrom(timezone);
    return timezoneOffset * 60 * 1000;
}
function adjustTimeZone(dateObj, timeZone) {
    if (dateObj === null) return null;
    let baseDate = dateObj.getTime() - dateObj.getTimezoneOffset() * 60 * 1000;
    const offset = offsetMS(dateObj, timeZone);
    offsetMSFallback(dateObj, timeZone);
    baseDate += - offset;
    return new Date(baseDate);
}
function datetimeToNumber(dateObj) {
    if (dateObj === null) return 0;
    return dateObj.getTime() / ( 1000 * 60 * 60 * 24 );
}
function numberToDatetime(num) {
    return new Date(Math.round(num * 1000 * 60 * 60 * 24));
}
function fixDigits(formattedParts, parsed) {
    ['hour', 'minute', 'second'].forEach(type => {
        const defn = formattedParts.find(f => f.type === type);
        if (!defn) return;
        const fmt = parsed.find(pair => pair[0] === type)[1];
        if (fmt === '2-digit' && defn.value.length === 1) defn.value = `0${defn.value}`;
        if (fmt === 'numeric' && defn.value.length === 2 && defn.value.charAt(0) === '0') defn.value = defn.value.slice(1);
    });
}
function fixYear(formattedParts, parsed) {
    const defn = formattedParts.find(f => f.type === 'year');
    if (!defn) return;
    const chars = parsed.find(pair => pair[0] === 'year')[2];
    while(defn.value.length < chars) {
        defn.value = `0${defn.value}`;
    }
}
function formatDateToParts(dateValue, language, skeleton, timeZone) {
    const mappings = key => ({
        hour12: 'dayPeriod',
        fractionalSecondDigits: 'fractionalSecond',
    })[key] || key;
    const allParameters = parseDateTimeSkeleton(skeleton, language);
    allParameters.push(['timeZone', timeZone]);
    const parsed = allParameters.filter(p => !p[0].startsWith('x-'));
    const nonStandard = allParameters.filter(p => p[0].startsWith('x-'));
    const options = Object.fromEntries(parsed);
    delete options.literal;
    const df = new Intl.DateTimeFormat(language, options);
    const formattedParts = df.formatToParts(dateValue);
    fixDigits(formattedParts, allParameters);
    fixYear(formattedParts, parsed);
    return parsed.reduce((result, cur) => {
        if (cur[0] === 'literal') result.push(cur);
        else {
            const v = formattedParts.find(p => p.type === mappings(cur[0]));
            if (v && v.type === 'timeZoneName') {
                const tz = nonStandard.find(p => p[0] === 'x-timeZoneName')[1];
                const category = tz[0];
                if (category === 'Z') {
                    if (tz.length < 4) {
                        v.value = v.value.replace(/(GMT|:)/g, '');
                        if (v.value === '') v.value = '+0000';
                    } else if (tz.length === 5) {
                        if (v.value === 'GMT') v.value = 'Z';
                        else v.value = v.value.replace(/GMT/, '');
                    }
                }
                if (category === 'X' || category === 'x') {
                    if (tz.length === 1) {
                        v.value = v.value.replace(/(GMT|:(00)?)/g, '');
                    }
                    if (tz.length === 2) {
                        v.value = v.value.replace(/(GMT|:)/g, '');
                    }
                    if (tz.length === 3) {
                        v.value = v.value.replace(/GMT/g, '');
                    }
                    if (category === 'X' && v.value === '') v.value = 'Z';
                } else if (tz === 'O') {
                    v.value = v.value.replace(/GMT/g, '').replace(/0(\d+):/, '$1:').replace(/:00/, '');
                    if (v.value === '') v.value = '+0';
                }
            }
            if (v) result.push([v.type, v.value]);
        }
        return result;
    }, []);
}
function formatDate(dateValue, language, skeleton, timeZone) {
    if (skeleton.startsWith('date|')) {
        skeleton = skeleton.split('|')[1];
    }
    if (ShorthandStyles$1.find(type => skeleton.includes(type))) {
        const options = {timeZone};
        const parts = skeleton.split(/\s/).filter(s => s.length);
        if (ShorthandStyles$1.indexOf(parts[0]) > -1) {
            options.dateStyle = parts[0];
        }
        if (parts.length > 1 && ShorthandStyles$1.indexOf(parts[1]) > -1) {
            options.timeStyle = parts[1];
        }
        return new Intl.DateTimeFormat(language, options).format(dateValue);
    }
    const parts = formatDateToParts(dateValue, language, skeleton, timeZone);
    return parts.map(p => p[1]).join('');
}
function parseDate(dateString, language, skeleton, timeZone, bUseUTC = false) {
    if (skeleton.startsWith('date|')) {
        skeleton = skeleton.split('|')[1];
    }
    const lookups = [];
    const regexParts = [];
    const calendar = calendarName(language);
    const digits = digitChars(language);
    const twoDigit = `([${digits[0]}-${digits[9]}]{1,2})`;
    const threeDigit = `([${digits[0]}-${digits[9]}]{1,3})`;
    const fourDigit = `([${digits[0]}-${digits[9]}]{1,4})`;
    let hourCycle = 'h12';
    let _bUseUTC = bUseUTC;
    let _setFullYear = false;
    const isSeparator = str => str.length === 1 &&  ':-/.'.includes(str);
    const monthNumber = str => getNumber(str) - 1;
    const getNumber = str => str.split('').reduce((total, digit) => (total * 10) + digits.indexOf(digit), 0);
    const yearNumber = templateDigits => str => {
        let year = getNumber(str);
        year = year < 100 && templateDigits === 2 ? year + 2000 : year;
        if (calendar === 'islamic') year = Math.ceil(year * 0.97 + 622);
        if (templateDigits > 2 && year < 100) {
            _setFullYear = true;
        }
        return year;
    };
    const monthLookup = list => month => list.indexOf(month);
    const parsed = parseDateTimeSkeleton(skeleton, language);
    const months = monthNames(language, Object.fromEntries(parsed));
    parsed.forEach(([option, value, len]) => {
        if (option === 'literal') {
            if (isSeparator(value)) regexParts.push(`[^${digits[0]}-${digits[9]}]`);
            else regexParts.push(value);
        } else if (option === 'month' && ['numeric', '2-digit'].includes(value)) {
            regexParts.push(twoDigit);
            lookups.push(['month', monthNumber]);
        } else if (option === 'month' && ['formatted', 'long', 'short', 'narrow'].includes(value)) {
            regexParts.push(`(${months.join('|')})`);
            lookups.push(['month', monthLookup(months)]);
        } else if (['day', 'minute', 'second'].includes(option)) {
            if (option === 'minute' || option === 'second') {
                _bUseUTC = false;
            }
            regexParts.push(twoDigit);
            lookups.push([option, getNumber]);
        } else if (option === 'fractionalSecondDigits') {
            _bUseUTC = false;
            regexParts.push(threeDigit);
            lookups.push([option, (v, obj) => obj.fractionalSecondDigits + getNumber(v)]);
        } else if (option === 'hour') {
            _bUseUTC = false;
            regexParts.push(twoDigit);
            lookups.push([option, (v, obj) => obj.hour + getNumber(v)]);
        } else if (option === 'year') {
            regexParts.push('numeric' === value ? fourDigit : twoDigit);
            lookups.push(['year', yearNumber(len)]);
        } else if (option === 'dayPeriod') {
            _bUseUTC = false;
            const dayPeriod = getDayPeriod(language);
            if (dayPeriod) {
                regexParts.push(dayPeriod.regex);
                lookups.push(['hour', dayPeriod.fn]);
            }
        } else if (option === 'hourCycle') {
            _bUseUTC = false;
            hourCycle = value;
        } else if (option === 'x-timeZoneName') {
            _bUseUTC = false;
            regexParts.push('(?:GMT|UTC|Z)?([+\\-−0-9]{0,3}:?[0-9]{0,2})');
            lookups.push([option, (v, obj) => {
                _bUseUTC = true;
                if (!v) return;
                const timeParts = v.replace(/−/, '-').match(/([+\-\d]{2,3}):?(\d{0,2})/);
                const hours = timeParts[1] * 1;
                obj.hour -= hours;
                const mins = timeParts.length > 2 ? timeParts[2] * 1 : 0;
                obj.minute -= (hours < 0) ? - mins : mins;
            }]);
        } else if (option !== 'timeZoneName') {
            _bUseUTC = false;
            regexParts.push('.+?');
        }
        return regexParts;
    }, []);
    const regex = new RegExp(regexParts.join(''));
    const match = dateString.match(regex);
    if (match === null) return dateString;
    const dateObj = {year: 1972, month: 0, day: 1, hour: 0, minute: 0, second: 0, fractionalSecondDigits: 0};
    match.slice(1).forEach((m, index) => {
        const [element, func] = lookups[index];
        dateObj[element] = func(m, dateObj);
    });
    if (hourCycle === 'h24' && dateObj.hour === 24) dateObj.hour = 0;
    if (hourCycle === 'h12' && dateObj.hour === 12) dateObj.hour = 0;
    if (_bUseUTC) {
        const utcDate = new Date(Date.UTC(
            dateObj.year,
            dateObj.month,
            dateObj.day,
            dateObj.hour,
            dateObj.minute,
            dateObj.second,
            dateObj.fractionalSecondDigits,
        ));
        if (_setFullYear) {
            utcDate.setUTCFullYear(dateObj.year);
        }
        return utcDate;
    }
    const jsDate = new Date(
        dateObj.year,
        dateObj.month,
        dateObj.day,
        dateObj.hour,
        dateObj.minute,
        dateObj.second,
        dateObj.fractionalSecondDigits,
    );
    if (_setFullYear) {
        jsDate.setFullYear(dateObj.year);
    }
    return timeZone == null ? jsDate : adjustTimeZone(jsDate, timeZone);
}
function parseDefaultDate(dateString, language, bUseUTC) {
    return parseDate(dateString, language, 'yyyy-MM-dd', null, bUseUTC);
}
const currencies = {
  'da-DK': 'DKK',
  'de-DE': 'EUR',
  'en-US': 'USD',
  'en-GB': 'GBP',
  'es-ES': 'EUR',
  'fi-FI': 'EUR',
  'fr-FR': 'EUR',
  'it-IT': 'EUR',
  'ja-JP': 'JPY',
  'nb-NO': 'NOK',
  'nl-NL': 'EUR',
  'pt-BR': 'BRL',
  'sv-SE': 'SEK',
  'zh-CN': 'CNY',
  'zh-TW': 'TWD',
  'ko-KR': 'KRW',
  'cs-CZ': 'CZK',
  'pl-PL': 'PLN',
  'ru-RU': 'RUB',
  'tr-TR': 'TRY'
};
const locales = Object.keys(currencies);
const getCurrency = function (locale) {
  if (locales.indexOf(locale) > -1) {
    return currencies[locale]
  } else {
    const matchingLocale = locales.find(x => x.startsWith(locale));
    if (matchingLocale) {
      return currencies[matchingLocale]
    }
  }
  return ''
};
const NUMBER_REGEX =
    /(?:[#]+|[@]+(#+)?|[0]+|[,]|[.]|[-]|[+]|[%]|[¤]{1,4}(?:\/([a-zA-Z]{3}))?|[;]|[K]{1,2}|E{1,2}[+]?|'(?:[^']|'')*')|[^a-zA-Z']+/g;
const supportedUnits = ['acre', 'bit', 'byte', 'celsius', 'centimeter', 'day',
    'degree', 'fahrenheit', 'fluid-ounce', 'foot', 'gallon', 'gigabit',
    'gigabyte', 'gram', 'hectare', 'hour', 'inch', 'kilobit', 'kilobyte',
    'kilogram', 'kilometer', 'liter', 'megabit', 'megabyte', 'meter', 'mile',
    'mile-scandinavian', 'milliliter', 'millimeter', 'millisecond', 'minute', 'month',
    'ounce', 'percent', 'petabyte', 'pound', 'second', 'stone', 'terabit', 'terabyte', 'week', 'yard', 'year'].join('|');
const ShorthandStyles = [/^currency(?:\/([a-zA-Z]{3}))?$/, /^decimal$/, /^integer$/,  /^percent$/, new RegExp(`^unit\/(${supportedUnits})$`)];
function parseNumberSkeleton(skeleton, language) {
    const options = {};
    const order = [];
    let match, index;
    for (index = 0; index < ShorthandStyles.length && match == null; index++) {
        match = ShorthandStyles[index].exec(skeleton);
    }
    if (match) {
        switch(index) {
            case 1:
                options.style = 'currency';
                options.currencyDisplay = 'narrowSymbol';
                if (match[1]) {
                    options.currency = match[1];
                } else {
                    options.currency = getCurrency(language);
                }
                break;
            case 2:
                new Intl.NumberFormat(language, {}).resolvedOptions();
                options.minimumFractionDigits = options.minimumFractionDigits || 2;
                break;
            case 3:
                options.minimumFractionDigits = 0;
                options.maximumFractionDigits = 0;
                break;
            case 4:
                options.style = 'percent';
                options.maximumFractionDigits = 2;
                break;
            case 5:
                options.style = "unit";
                options.unitDisplay = "long";
                options.unit = match[1];
                break;
        }
        return {
            options,
            order
        }
    }
    options.useGrouping = false;
    options.minimumIntegerDigits = 1;
    options.maximumFractionDigits = 0;
    options.minimumFractionDigits = 0;
    skeleton.replace(NUMBER_REGEX, (match, maxSignificantDigits, currencySymbol, offset) => {
        const len = match.length;
        switch(match[0]) {
            case '#':
                order.push(['digit', len]);
                if (options?.decimal === true) {
                    options.maximumFractionDigits = options.minimumFractionDigits + len;
                }
                break;
            case '@':
                if (options?.minimumSignificantDigits) {
                    throw "@ symbol should occur together"
                }
                const hashes = maxSignificantDigits || "";
                order.push(['@', len - hashes.length]);
                options.minimumSignificantDigits = len - hashes.length;
                options.maximumSignificantDigits = len;
                order.push(['digit', hashes.length]);
                break;
            case ',':
                if (options?.decimal === true) {
                    throw "grouping character not supporting for fractions"
                }
                order.push(['group', 1]);
                options.useGrouping = 'auto';
                break;
            case '.':
                if (options?.decimal) {
                    console.error("only one decimal symbol is allowed");
                } else {
                    order.push(['decimal', 1]);
                    options.decimal = true;
                }
                break;
            case '0':
                order.push('0', len);
                if(options.minimumSignificantDigits || options.maximumSignificantDigits) {
                    throw "0 is not supported with @"
                }
                if (options?.decimal === true) {
                    options.minimumFractionDigits = len;
                    if (!options.maximumFractionDigits) {
                        options.maximumFractionDigits = len;
                    }
                } else {
                    options.minimumIntegerDigits = len;
                }
                break;
            case '-':
                if (offset !== 0) {
                    console.error("sign display is always in the beginning");
                }
                options.signDisplay = 'negative';
                order.push(['signDisplay', 1, '-']);
                break;
            case '+':
                if (offset !== 0 && order[order.length - 1][0] === 'E') {
                    console.error("sign display is always in the beginning");
                }
                if (offset === 0) {
                    options.signDisplay = 'always';
                }
                order.push(['signDisplay', 1, '+']);
                break;
            case '¤':
                if (offset !== 0 && offset !== skeleton.length - 1) {
                    console.error("currency display should be either in the beginning or at the end");
                } else {
                    options.style = 'currency';
                    options.currencyDisplay = ['symbol', 'code', 'name', 'narrowSymbol'][len - 1];
                    options.currency = currencySymbol || getCurrency(language);
                    order.push(['currency', len]);
                }
                break;
            case '%':
                if (offset !== 0 && offset !== skeleton.length - 1) {
                    console.error("percent display should be either in the beginning or at the end");
                } else {
                    order.push(['%', 1]);
                    options.style = 'percent';
                }
                break;
            case 'E':
                order.push(['E', len]);
                options.style = ['scientific','engineering'](len - 1);
                break;
            default:
                console.error("unknown chars" + match);
        }
    });
    return {
        options,
        order
    };
}
function formatNumber(numberValue, language, skeletn) {
    if (skeletn.startsWith('num|')) {
        skeletn = skel.split('|')[1];
    }
    if (!skeletn) return numberValue
    language = language || "en";
    const {options, order} = parseNumberSkeleton(skeletn, language);
    return new Intl.NumberFormat(language, options).format(numberValue);
}
function getMetaInfo(language, skel) {
    const parts = {};
    let options = new Intl.NumberFormat(language, {style:'decimal', useGrouping:false}).formatToParts(9876543210.1);
    parts.digits = options.find(p => p.type === 'integer').value.split('').reverse();
    parts.decimal = options.find(p => p.type === 'decimal').value;
    const gather = type => {
        const find = options.find(p => p.type === type);
        if (find) parts[type] = find.value;
    };
    const parsed = parseNumberSkeleton(skel);
    const nf = new Intl.NumberFormat(language, parsed);
    options = nf.formatToParts(-987654321);
    gather('group');
    gather('minusSign');
    gather('percentSign');
    parts.currency = options.filter(p => p.type === 'currency').map(p => p.value);
    parts.literal = options.filter(p => p.type === 'literal').map(p => p.value);
    options = nf.formatToParts(987654321);
    gather('plusSign');
    gather('exponentSeparator');
    gather('unit');
    return parts;
}
function parseNumber(numberString, language, skel) {
    try {
        if (skel.startsWith('num|')) {
            skel = skel.split('|')[1];
        }
        let factor = 1;
        let number = numberString;
        const meta = getMetaInfo(language, skel);
        if (meta.group) number = number.replaceAll(meta.group, '');
        number = number.replace(meta.decimal, '.');
        if (meta.unit) number = number.replaceAll(meta.unit, '');
        if (meta.minusSign && number.includes(meta.minusSign)) {
            number = number.replace(meta.minusSign, '');
            factor *= -1;
        }
        if (meta.percentSign && number.includes(meta.percentSign)) {
            factor = factor/100;
            number = number.replace(meta.percentSign, '');
        }
        meta.currency.forEach(currency => number = number.replace(currency, ''));
        meta.literal.forEach(literal => {
            if (number.includes(literal)) {
                if (literal === '(') factor = factor * -1;
                number = number.replace(literal, '');
            }
        });
        if (meta.plusSign) number = number.replace(meta.plusSign, '');
        if (meta.exponentSeparator) {
            let e;
            [number, e] = number.split(meta.exponentSeparator);
            factor = factor * Math.pow(10, e);
        }
        const result = factor * number;
        return isNaN(result) ? numberString : result;
    } catch (e) {
        console.dir(e);
        return numberString;
    }
}
const getCategory = function (skeleton) {
    const chkCategory = skeleton?.match(/^(?:(num|date)\|)?(.+)/);
    return [chkCategory?.[1], chkCategory?.[2]]
};
const format = function (value, locale, skeleton, timezone) {
    const [category, skelton] = getCategory(skeleton);
    switch (category) {
        case 'date':
            if (!(value instanceof Date)) {
                value = new Date(value.replace(/-/g, '\/').replace(/T.+/, ''));
            }
            return formatDate(value, locale, skelton, timezone)
        case 'num':
            return formatNumber(value, locale, skelton)
        default:
            throw `unable to deduce the format. The skeleton should be date|<format> for date formats and num|<format> for numbers`
    }
};
const parse = function (value, locale, skeleton, timezone) {
    const [category, skelton] = getCategory(skeleton);
    switch (category) {
        case 'date':
            return parseDate(value, locale, skelton, timezone)
        case 'number':
            return parseNumber(value, locale, skelton)
        default:
            throw `unable to deduce the format. The skeleton should be date|<format> for date formats and num|<format> for numbers`
    }
};

export { datetimeToNumber, format, formatDate, formatNumber, numberToDatetime, parse, parseDate, getSkeleton as parseDateSkeleton, parseDefaultDate, parseNumber };
