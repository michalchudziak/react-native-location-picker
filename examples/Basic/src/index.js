import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import LocationPicker from 'react-native-location-picker';

const { width } = Dimensions.get('window');

class Basic extends Component {

  state = {
    latitude: 37.78825,
    longitude: -122.4324,
  }

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 3,
    borderRadius: 7,
    height: 30,
    width: 0.8 * width,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  locationPickerButton: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
});

AppRegistry.registerComponent('Basic', () => Basic);
