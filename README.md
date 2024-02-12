# react-native-wear-connectivity

- Create a [Wear OS][1] app using react-native
- Connect two react-native apps (Wear OS and Android phone)
- **Both apps are written in react-native**

[1]: https://wearos.google.com

# Table of Contents

- [react-native-wear-connectivity](#react-native-wear-connectivity)
- [Installation](#installation)
- [Example of implementation](#example-of-implementation)
- [API Documentation](#api-documentation)
- [How to create a WearOS app using react-native](#how-to-create-a-wearos-app-using-react-native)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
yarn add react-native-wear-connectivity
```

or

```sh
npm install react-native-wear-connectivity
```

## Example of implementation

Implementation of the above counter application.

```js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { sendMessage, watchEvents } from 'react-native-wear-connectivity';

function CounterScreen() {
  const [count, setCount] = useState(0);

  // listen for messages from wearOS/phone
  useEffect(() => {
    const unsubscribe = watchEvents.on('message', () => {
      setCount((prevCount) => prevCount + 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // send a message from/to wearOS
  const onSuccess = (result) => console.log(result);
  const onError = (error) => console.log(error);

  const sendMessageToWear = () => {
    const json = { text: 'hello', event: 'message' };
    sendMessage(json, onSuccess, onError);
  };

  return (
    <View>
      <Text>{count}</Text>
      <Button title="increase counter" onPress={sendMessageToWear} />
    </View>
  );
}
```

## How to create a WearOS app using react-native

- Create a new react-native app using the same name of your Mobile app. Both apps needs to share the same package name (AndroidManifest, build.gradle, the project files) and applicationId (build.gradle). etc.)

```bash
npx react-native@latest init AwesomeProject
```

- Add the following line to the new project AndroidManifest (file ):

```xml
<!-- this file is located at android/app/src/main/AndroidManifest.xml -->
<uses-feature android:name="android.hardware.type.watch" />
```

- Pair the Android emulator with the Wear OS emulator (instructions [here][21]). I suggest using the emulator [WearOS Large round][22], as the other emulator has issues with the react-native dev menu.
- Start the metro server on port 8082 with `yarn start --port=8082`
- Open the `react native dev menu` and change the bundle location to `your-ip:8082` (for ex. `192.168.18.2:8082`).
- Repeat the same steps for the Android Phone Emulator and use a different port (for ex. 8081).
- **Important Note**: Before publishing to Google Play, make sure that both apps are signed using the same key (instructions [here][20])

You can now build the app with `yarn android`. JS fast-refresh and the other metro functionalities work without problem (no need to build for JS changes).

[20]: https://reactnative.dev/docs/next/signed-apk-android
[21]: https://developer.android.com/training/wearables/get-started/connect-phone
[22]: https://gist.github.com/assets/24992535/f6cb9f84-dc50-492b-963d-6d9e9396f451 'wear os large round'

## API Documentation

### Send Messages

```js
import { sendMessage } from 'react-native-wear-connectivity';

sendMessage({ text: 'Hello watch!' });
```

### Receive Messages

```js
import { watchEvents } from 'react-native-wear-connectivity';

const unsubscribe = watchEvents.on('message', (message) => {
  console.log('received message from watch', message);
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Feature requests are discussed in the [issue tracker][40].

[40]: https://github.com/fabOnReact/react-native-wear-connectivity/issues

## License

MIT
