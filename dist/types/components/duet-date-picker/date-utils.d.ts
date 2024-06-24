export declare enum DaysOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}
export declare function createDate(year: string, month: string, day: string): Date;
/**
 * @param value date string in ISO format YYYY-MM-DD
 */
export declare function parseISODate(value: string): Date;
/**
 * print date in format YYYY-MM-DD
 * @param date
 */
export declare function printISODate(date: Date): string;
/**
 * Compare if two dates are equal in terms of day, month, and year
 */
export declare function isEqual(a: Date, b: Date): boolean;
/**
 * Compare if two dates are in the same month of the same year.
 */
export declare function isEqualMonth(a: Date, b: Date): boolean;
export declare function addDays(date: Date, days: number): Date;
export declare function addMonths(date: Date, months: number): Date;
export declare function addYears(date: Date, years: number): Date;
export declare function startOfWeek(date: Date, firstDayOfWeek?: DaysOfWeek): Date;
export declare function endOfWeek(date: Date, firstDayOfWeek?: DaysOfWeek): Date;
export declare function startOfMonth(date: Date): Date;
export declare function endOfMonth(date: Date): Date;
export declare function setMonth(date: Date, month: number): Date;
export declare function setYear(date: Date, year: number): Date;
/**
 * Check if date is within a min and max
 */
export declare function inRange(date: Date, min?: Date, max?: Date): boolean;
/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export declare function clamp(date: Date, min?: Date, max?: Date): Date;
/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
export declare function getViewOfMonth(date: Date, firstDayOfWeek?: DaysOfWeek): Date[];
/**
 * Form random hash
 */
export declare function chr4(): string;
/**
 * Create random identifier with a prefix
 * @param prefix
 */
export declare function createIdentifier(prefix: any): string;
/**
 * Get startOfWeekYear
 * @param date
 * @param firstDayOfWeek
 */
export declare function startOfWeekYear(date: any, firstDayOfWeek: any): Date;
/**
 * Gets the year of the week
 * @param date
 * @param firstDayOfWeek
 */
export declare function getWeekYear(date: any, firstDayOfWeek: any): number;
/**
 * Gets the week number for the given date
 * @param date
 * @param firstDayOfWeek
 */
export declare function getWeek(date: any, firstDayOfWeek: any): number;
/**
 * Gets the full week input value
 * @param date
 * @param firstDayOfWeek
 */
export declare function getWeekInputValue(date: any, firstDayOfWeek: any): string;
