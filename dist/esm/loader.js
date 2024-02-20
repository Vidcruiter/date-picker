/*!
 * Built with Duet Design System
 */
import { C as CSS, p as plt, w as win, a as promiseResolve, b as bootstrapLazy } from './index-540b9207.js';
export { s as setNonce } from './index-540b9207.js';

/*
 Stencil Client Patch Esm v2.22.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (!(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-4f85690d.js').then(() => {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["duet-date-picker",[[0,"duet-date-picker",{"name":[1],"identifier":[1],"disabled":[516],"role":[1],"direction":[1],"required":[4],"value":[1537],"min":[1],"max":[1],"firstDayOfWeek":[2,"first-day-of-week"],"localization":[16],"dateAdapter":[16],"isDateDisabled":[16],"selectByWeek":[4,"select-by-week"],"activeFocus":[32],"focusedDay":[32],"open":[32],"setFocus":[64],"show":[64],"hide":[64]},[[6,"click","handleDocumentClick"]]]]]], options);
  });
};

export { defineCustomElements };
