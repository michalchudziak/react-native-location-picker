#react-native-location-picker

Customizable location picker component for react native.

##Requirements

- RN >= 0.29
- Google Maps API KEY for Android version.

>This library is build on top of `react-native-maps` (see: https://github.com/lelandrichardson/react-native-maps)

##Installation

>If you want to run this library on Genymotion please refer to (http://stackoverflow.com/a/20137324/1424349)

Install package from `npm`:

```bash
$ npm install react-native-location-picker --save
```

You need to install `react-native-maps` native dependencies. You can do it automatically with:

```bash
$ react-native link
```

or manually:

###iOS

For iOS installation please include line below in your `Podfile` and run `pod install`

`pod 'react-native-maps', :path => '../node_modules/react-native-maps'`

###Android

- in your `android/app/build.gradle` add:
```groovy
...
dependencies {
  ...
  compile project(':react-native-maps')
}
```

- in your `android/settings.gradle` add:
```groovy
...
include ':react-native-maps'
project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/android')
```

- in your `MainApplication.java` add:

```java
import com.airbnb.android.react.maps.MapsPackage;

    ...
    @Override protected List<ReactPackage> getPackages() {
      return Arrays.asList(
          ...
          new MapsPackage()
        );
    }
```

- in your `AndroidManifest.xml` add:
```xml
<meta-data
  android:name="com.google.android.maps.v2.API_KEY"
  android:value="YOUR API KEY" />
```

##Example

You can find this exaple under `examples/Basic`, and run it via:

```bash
$ cd examples/Basic && npm i && npm start
```

```js
import LocationPicker from 'react-native-location-picker';

<LocationPicker
  buttonText="DONE"
  onFinish={({ latitude, longitude }) => {
    this.setState({ latitude, longitude });
  }}
  location={{
    latitude: this.state.latitude,
    longitude: this.state.longitude,
  }}
  renderInput={({ latitude, longitude }) => (
    <View style={styles.input}>
      <Text>
        {`Lat: ${
          Math.round(latitude * 100) / 100
        }, Lng: ${
          Math.round(longitude * 100) / 100
        }`}
      </Text>
    </View>
  )}
  renderButton={() => (
    <Text style={styles.locationPickerButton}>DONE</Text>
  )}
/>
```
