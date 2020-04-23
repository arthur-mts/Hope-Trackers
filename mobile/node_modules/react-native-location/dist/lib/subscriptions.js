"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal helper class for managing event subscriptions
 * @ignore
 */
var Subscriptions = /** @class */ (function () {
    function Subscriptions(nativeInterface, eventEmitter) {
        this.locationListenerCount = 0;
        this.headingListenerCount = 0;
        this.significantLocationListenerCount = 0;
        this.nativeInterface = nativeInterface;
        this.eventEmitter = eventEmitter;
    }
    Subscriptions.prototype.subscribeToLocationUpdates = function (listener) {
        var _this = this;
        var emitterSubscription = this.eventEmitter.addListener("locationUpdated", listener);
        this.nativeInterface.startUpdatingLocation();
        this.locationListenerCount += 1;
        return function () {
            emitterSubscription.remove();
            _this.locationListenerCount -= 1;
            if (_this.locationListenerCount === 0) {
                _this.nativeInterface.stopUpdatingLocation();
            }
        };
    };
    Subscriptions.prototype.subscribeToHeadingUpdates = function (listener) {
        var _this = this;
        var emitterSubscription = this.eventEmitter.addListener("headingUpdated", listener);
        this.nativeInterface.startUpdatingHeading();
        this.headingListenerCount += 1;
        return function () {
            emitterSubscription.remove();
            _this.headingListenerCount -= 1;
            if (_this.headingListenerCount === 0) {
                _this.nativeInterface.stopUpdatingHeading();
            }
        };
    };
    Subscriptions.prototype.subscribeToSignificantLocationUpdates = function (listener) {
        var _this = this;
        var emitterSubscription = this.eventEmitter.addListener("locationUpdated", listener);
        this.nativeInterface.startMonitoringSignificantLocationChanges();
        this.significantLocationListenerCount += 1;
        return function () {
            emitterSubscription.remove();
            _this.significantLocationListenerCount -= 1;
            if (_this.significantLocationListenerCount === 0) {
                _this.nativeInterface.stopMonitoringSignificantLocationChanges();
            }
        };
    };
    return Subscriptions;
}());
exports.default = Subscriptions;
//# sourceMappingURL=subscriptions.js.map