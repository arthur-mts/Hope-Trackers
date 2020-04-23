"use strict";
/* eslint-disable valid-jsdoc */
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
/**
 * @ignore
 */
exports.get = function () {
    var nativeInterface = react_native_1.NativeModules.RNLocation;
    if (!nativeInterface) {
        console.warn("Could not find the RNLocation native module. Have you correctly linked react-native-location and rebuilt your app?");
    }
    var eventEmitter = new react_native_1.NativeEventEmitter(nativeInterface);
    return { nativeInterface: nativeInterface, eventEmitter: eventEmitter };
};
exports.default = {
    get: exports.get
};
//# sourceMappingURL=nativeInterface.js.map