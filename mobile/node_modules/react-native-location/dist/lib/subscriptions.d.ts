import { EventEmitter } from "react-native";
import { Location, Subscription, Heading, RNLocationNativeInterface } from "../types";
/**
 * Internal helper class for managing event subscriptions
 * @ignore
 */
export default class Subscriptions {
    private nativeInterface;
    private eventEmitter;
    private locationListenerCount;
    private headingListenerCount;
    private significantLocationListenerCount;
    constructor(nativeInterface: RNLocationNativeInterface, eventEmitter: EventEmitter);
    subscribeToLocationUpdates(listener: (locations: Location[]) => void): Subscription;
    subscribeToHeadingUpdates(listener: (heading: Heading) => void): Subscription;
    subscribeToSignificantLocationUpdates(listener: (locations: Location[]) => void): Subscription;
}
