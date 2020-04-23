"use strict";
/* eslint-disable valid-jsdoc */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps a promise with a timeout which resolves to `null` after a given delay.
 * @ignore
 */
exports.promiseTimeoutResolveNull = function (ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    var timeout = new Promise(function (resolve) {
        var id = setTimeout(function () {
            clearTimeout(id);
            resolve(null);
        }, ms);
    });
    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
};
//# sourceMappingURL=utils.js.map