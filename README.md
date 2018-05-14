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

You can find this example under `examples/`:
For react < 15.0
```bash
$ cd examples/Basic && npm i && npm start
```
For react >= 15.0
```bash
$ cd examples/BasicWithReact16 && npm i && npm start
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

API

To show search bar on map modal view, include both renderSearchInput and renderSearchButton properties.

goButtonTitle: Search address button text,
searchModalTitle: Title of map modal,
searchModalButtonOk: PropTypes.string,
searchModalButtonCancel: PropTypes.string,
location: Initial location coordinates,
onFinish: Callback function,
renderOkButton: Select address callback button,
renderCancelButton: Cancel address selection callback button,
renderSearchInput: Function for render TextInput for search addresses,
renderSearchButton: Function for render Search button for search address,
renderInput: Function for render selected address,
markerText: Marker label on map,
markerView: Marker view on map,
markerImage: Marker icon on map,
buttonContainerStyles: Style of container of callback buttons,
mapStyles: Style of map modal,
searchContainerStyles: Style of search input container
