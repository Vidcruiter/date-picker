/*!
 * Built with Duet Design System
 */
import { h } from "@stencil/core";
import { startOfWeek, getWeek } from "./date-utils";
export const DatePickerInput = ({ onClick, dateFormatter, localization, name, formattedValue, valueAsDate, value, identifier, disabled, required, role, buttonRef, inputRef, onInput, onBlur, onFocus, selectByWeek, firstDayOfWeek, }) => {
  let actualValue = value;
  let formattedDate = formattedValue;
  if (selectByWeek && value !== "") {
    const firstDay = startOfWeek(valueAsDate, firstDayOfWeek);
    const formatter = new Intl.DateTimeFormat(localization.locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    actualValue = `${valueAsDate.getFullYear()}-W${getWeek(valueAsDate, firstDayOfWeek)
      .toString()
      .padStart(2, "0")}`;
    formattedDate = `Week of ${formatter.format(firstDay)}`;
  }
  return (h("div", { class: "duet-date__input-wrapper" }, h("input", { class: "duet-date__input", value: formattedDate, placeholder: selectByWeek ? localization.weekPlaceholder : localization.placeholder, id: identifier, disabled: disabled, role: role, required: required ? true : undefined, "aria-autocomplete": "none", onInput: onInput, onFocus: onFocus, onBlur: onBlur, autoComplete: "off", ref: inputRef }), h("input", { type: "hidden", name: name, value: actualValue }), h("button", { class: "duet-date__toggle", onClick: onClick, disabled: disabled, ref: buttonRef, type: "button" }, h("span", { class: "duet-date__toggle-icon" }, h("svg", { "aria-hidden": "true", height: "24", viewBox: "0 0 21 21", width: "24", xmlns: "http://www.w3.org/2000/svg" }, h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(2 2)" }, h("path", { d: "m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { d: "m.5 4.5h16", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("g", { fill: "currentColor" }, h("circle", { cx: "8.5", cy: "8.5", r: "1" }), h("circle", { cx: "4.5", cy: "8.5", r: "1" }), h("circle", { cx: "12.5", cy: "8.5", r: "1" }), h("circle", { cx: "8.5", cy: "12.5", r: "1" }), h("circle", { cx: "4.5", cy: "12.5", r: "1" }), h("circle", { cx: "12.5", cy: "12.5", r: "1" }))))), h("span", { class: "duet-date__vhidden" }, localization.buttonLabel, valueAsDate && (h("span", null, ", ", localization.selectedDateMessage, " ", dateFormatter.format(valueAsDate)))))));
};
