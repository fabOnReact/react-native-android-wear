import { NativeModules, Platform } from 'react-native';
import { watchEvents } from './subscriptions';
import { sendMessage } from './messages';
import type { ReplyCallback, ErrorCallback } from './NativeWearConnectivity.ts';

const LINKING_ERROR =
  `The package 'react-native-wear-connectivity' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const WearConnectivityModule = isTurboModuleEnabled
  ? require('./NativeWearConnectivity').default
  : NativeModules.WearConnectivity;

const WearConnectivity = WearConnectivityModule
  ? WearConnectivityModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return WearConnectivity.multiply(a, b);
}

export {
  sendMessage,
  watchEvents,
  WearConnectivity,
  ReplyCallback,
  ErrorCallback,
};
