package com.wearconnectivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

abstract class WearConnectivitySpec extends ReactContextBaseJavaModule {
  WearConnectivitySpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void multiply(double a, double b, Promise promise);
  public abstract void sendMessage(ReadableMap messageData, Promise promise);
}
