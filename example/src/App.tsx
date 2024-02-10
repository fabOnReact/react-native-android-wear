import React from 'react';
import LoginScreen from './LoginScreen';
import { Platform } from 'react-native';
import { default as CounterScreenAndroid } from './CounterScreen/index.android';
import { default as CounterScreenIos } from './CounterScreen/index.ios';

const App = () => {
  const CounterScreen =
    Platform.OS === 'ios' ? CounterScreenIos : CounterScreenAndroid;
  return (
    <>
      <LoginScreen />
      <CounterScreen />
    </>
  );
};

export default App;
