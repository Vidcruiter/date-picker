/*!
 * Built with Duet Design System
 */
import { h } from "@stencil/core";
import { DatePickerDay } from "./date-picker-day";
import { getViewOfMonth, inRange, isEqual, startOfWeek } from "./date-utils";
function chunk(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function mapWithOffset(array, startingOffset, mapFn) {
  return array.map((_, i) => {
    const adjustedIndex = (i + startingOffset) % array.length;
    return mapFn(array[adjustedIndex]);
  });
}
export const DatePickerMonth = ({ selectedDate, focusedDate, labelledById, localization, firstDayOfWeek, min, max, dateFormatter, isDateDisabled, onDateSelect, onKeyboardNavigation, focusedDayRef, selectByWeek, }) => {
  const today = new Date();
  const days = getViewOfMonth(focusedDate, firstDayOfWeek);
  const getSelectedDate = day => {
    if (!selectByWeek || !selectedDate) {
      return selectedDate;
    }
    const min = startOfWeek(selectedDate, firstDayOfWeek);
    const max = new Date(min.getTime());
    max.setDate(max.getDate() + 6);
    if (inRange(day, min, max)) {
      return day;
    }
    return selectedDate;
  };
  return (h("table", { class: "duet-date__table", "aria-labelledby": labelledById }, h("thead", null, h("tr", null, mapWithOffset(localization.dayNames, firstDayOfWeek, dayName => (h("th", { class: "duet-date__table-header", scope: "col" }, h("span", { "aria-hidden": "true" }, dayName.substr(0, 2)), h("span", { class: "duet-date__vhidden" }, dayName)))))), h("tbody", null, chunk(days, 7).map(week => (h("tr", { class: {
      "duet-date__row": true,
      "select-by-week": selectByWeek,
    } }, week.map(day => (h("td", { class: "duet-date__cell" }, h(DatePickerDay, { day: day, today: today, focusedDay: focusedDate, isSelected: isEqual(day, getSelectedDate(day)), disabled: isDateDisabled(day), inRange: inRange(day, min, max), onDaySelect: onDateSelect, dateFormatter: dateFormatter, onKeyboardNavigation: onKeyboardNavigation, focusedDayRef: focusedDayRef }))))))))));
};
