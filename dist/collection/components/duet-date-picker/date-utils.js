/*!
 * Built with Duet Design System
 */
const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
const millisecondsInWeek = 604800000;
export var DaysOfWeek;
(function (DaysOfWeek) {
  DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
  DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
  DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
  DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
  DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
  DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
  DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek || (DaysOfWeek = {}));
export function createDate(year, month, day) {
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10);
  var yearInt = parseInt(year, 10);
  const isValid = Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;
  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}
/**
 * @param value date string in ISO format YYYY-MM-DD
 */
export function parseISODate(value) {
  if (!value) {
    return;
  }
  const matches = value.match(ISO_DATE_FORMAT);
  if (matches) {
    return createDate(matches[1], matches[2], matches[3]);
  }
}
/**
 * print date in format YYYY-MM-DD
 * @param date
 */
export function printISODate(date) {
  if (!date) {
    return "";
  }
  var d = date.getDate().toString(10);
  var m = (date.getMonth() + 1).toString(10);
  var y = date.getFullYear().toString(10);
  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }
  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }
  return `${y}-${m}-${d}`;
}
/**
 * Compare if two dates are equal in terms of day, month, and year
 */
export function isEqual(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return isEqualMonth(a, b) && a.getDate() === b.getDate();
}
/**
 * Compare if two dates are in the same month of the same year.
 */
export function isEqualMonth(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
export function addDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(date.getMonth() + months);
  return d;
}
export function addYears(date, years) {
  const d = new Date(date);
  d.setFullYear(date.getFullYear() + years);
  return d;
}
export function startOfWeek(date, firstDayOfWeek = DaysOfWeek.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  d.setDate(d.getDate() - diff);
  return d;
}
export function endOfWeek(date, firstDayOfWeek = DaysOfWeek.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);
  d.setDate(d.getDate() + diff);
  return d;
}
export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
export function setMonth(date, month) {
  const d = new Date(date);
  d.setMonth(month);
  return d;
}
export function setYear(date, year) {
  const d = new Date(date);
  d.setFullYear(year);
  return d;
}
/**
 * Check if date is within a min and max
 */
export function inRange(date, min, max) {
  return clamp(date, min, max) === date;
}
/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(date, min, max) {
  const time = date.getTime();
  if (min && min instanceof Date && time < min.getTime()) {
    return min;
  }
  if (max && max instanceof Date && time > max.getTime()) {
    return max;
  }
  return date;
}
/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start, end) {
  const days = [];
  let current = start;
  while (!isEqual(current, end)) {
    days.push(current);
    current = addDays(current, 1);
  }
  days.push(current);
  return days;
}
/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
export function getViewOfMonth(date, firstDayOfWeek = DaysOfWeek.Monday) {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek);
  return getDaysInRange(start, end);
}
/**
 * Form random hash
 */
export function chr4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}
/**
 * Create random identifier with a prefix
 * @param prefix
 */
export function createIdentifier(prefix) {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}
// ***************** Functions Copied from date-fns *****************
// Because I was getting typescript errors trying to use date-fns
/**
 * Get startOfWeekYear
 * @param date
 * @param firstDayOfWeek
 */
export function startOfWeekYear(date, firstDayOfWeek) {
  const year = getWeekYear(date, firstDayOfWeek);
  const firstWeek = new Date(date);
  firstWeek.setFullYear(year, 0, 4);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, firstDayOfWeek);
  return _date;
}
/**
 * Gets the year of the week
 * @param date
 * @param firstDayOfWeek
 */
export function getWeekYear(date, firstDayOfWeek) {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const firstWeekOfNextYear = new Date(date);
  firstWeekOfNextYear.setFullYear(year + 1, 0, 1);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, firstDayOfWeek);
  const firstWeekOfThisYear = new Date(date);
  firstWeekOfThisYear.setFullYear(year, 0, 1);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, firstDayOfWeek);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  }
  else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  }
  else {
    return year - 1;
  }
}
/**
 * Gets the week number for the given date
 * @param date
 * @param firstDayOfWeek
 */
export function getWeek(date, firstDayOfWeek) {
  const _date = new Date(date);
  const diff = +startOfWeek(_date, firstDayOfWeek) - +startOfWeekYear(_date, firstDayOfWeek);
  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}
/**
 * Gets the full week input value
 * @param date
 * @param firstDayOfWeek
 */
export function getWeekInputValue(date, firstDayOfWeek) {
  return `${getWeekYear(date, firstDayOfWeek)}-W${getWeek(date, firstDayOfWeek)
    .toString()
    .padStart(2, "0")}`;
}
