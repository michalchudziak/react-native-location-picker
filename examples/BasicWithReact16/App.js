import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from 'react-native';
import LocationPicker from 'react-native-location-picker';

const { width } = Dimensions.get('window');

class Basic extends Component {

  state = {
    latitude: 37.78825,
    longitude: -122.4324,
  }

  dummyFunc() {
    return null;
  }
  render() {
    return (
      <View style={styles.container}>
        <LocationPicker
          buttonText="DONE"
          onFinish={(address) => {
            if (address) {
              const {latitude,longitude} = address.position;
              const {formattedAddress} = address;
              this.setState({ latitude, longitude });
              this.setState({ formattedAddress });
            }
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
          renderOkButton={() => (
            <Text style={styles.locationPickerButton}>Ok</Text>
          )}
          renderCancelButton={() => (
            <Text style={styles.locationPickerButton}>Cancel</Text>
          )}
          renderSearchInput={(text, onChangeText) => {
            return (
              <TextInput
                style={styles.textInput}
                onChangeText={ onChangeText || this.dummyFunc}
                value={text.toString()}
              />
            )
          }}
          renderSearchButton={(onPress) => {
            return (
              <Button
                onPress={onPress || this.dummyFunc}
                title={this.props.goButtonTitle || 'Go'}
                color="#028FEF"
              />
            )
          }}
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
  textInput: {
    width: 0.8 * width,
    height: 30,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
});

export default Basic;
