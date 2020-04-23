import { EventEmitter } from "react-native";
import { LocationPermissionStatus, Subscription, RNLocationNativeInterface, RequestPermissionOptions } from "../types";
/**
 * Internal helper class for managing permissions
 * @ignore
 */
export default class Permissions {
    private nativeInterface;
    private eventEmitter;
    constructor(nativeInterface: RNLocationNativeInterface, eventEmitter: EventEmitter);
    requestPermission(options: RequestPermissionOptions): Promise<boolean>;
    getCurrentPermission(): Promise<LocationPermissionStatus>;
    checkPermission(options: RequestPermissionOptions): Promise<boolean>;
    subscribeToPermissionUpdates(listener: (status: LocationPermissionStatus) => void): Subscription;
}
