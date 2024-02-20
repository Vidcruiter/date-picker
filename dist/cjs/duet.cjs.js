/*!
 * Built with Duet Design System
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bc9129f2.js');

/*
 Stencil Client Patch Browser v2.22.3 | MIT Licensed | https://stenciljs.com
 */
/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */
function queryNonceMetaTagContent(doc) {
    var _a, _b, _c;
    return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
}
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    {
        // shim css vars
        index.plt.$cssShim$ = index.win.__cssshim;
    }
    // @ts-ignore
    const scriptElm = Array.from(index.doc.querySelectorAll('script')).find((s) => new RegExp(`\/${index.NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === index.NAMESPACE)
        ;
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('duet.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, index.win.location.href)).href;
        {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (!index.win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-dom" */ './dom-3ae14326.js'); }).then(() => opts);
        }
    }
    return index.promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(index.NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        index.win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        index.win[importFunctionName] = (src) => {
            var _a;
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = index.doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                // Apply CSP nonce to the script tag if it exists
                const nonce = (_a = index.plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(index.doc);
                if (nonce != null) {
                    script.setAttribute('nonce', nonce);
                }
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(index.win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                index.doc.head.appendChild(script);
            }
            return mod;
        };
    }
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["duet-date-picker.cjs",[[0,"duet-date-picker",{"name":[1],"identifier":[1],"disabled":[516],"role":[1],"direction":[1],"required":[4],"value":[1537],"min":[1],"max":[1],"firstDayOfWeek":[2,"first-day-of-week"],"localization":[16],"dateAdapter":[16],"isDateDisabled":[16],"selectByWeek":[4,"select-by-week"],"activeFocus":[32],"focusedDay":[32],"open":[32],"setFocus":[64],"show":[64],"hide":[64]},[[6,"click","handleDocumentClick"]]]]]], options);
});

exports.setNonce = index.setNonce;
