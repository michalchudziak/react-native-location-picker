import React, { Component, PropTypes } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('window');

export default class LocationPicker extends Component {
  static propTypes = {
    location: PropTypes.object,
    onFinish: PropTypes.func.isRequired,
    renderButton: PropTypes.func.isRequired,
    renderInput: PropTypes.func.isRequired,
    markerText: PropTypes.string,
    buttonContainerStyles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    mapStyles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  };

  state = {
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    deltas: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    timeout: null,
    isPressing: false,
    isModalOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (location) {
      this.setState({ coordinates: location });
    }
  }

  onRegionChange = ({ latitude, longitude }) => {
    this.isPressing();
    this.setState({ coordinates: { latitude, longitude } });
  }

  isPressing = () => {
    const { timeout } = this.state;

    this.setState({ isPressing: true });

    if (timeout) {
      clearTimeout(timeout);
    }

    const newTimeout = setTimeout(() => this.setState({ isPressing: false }), 500);
    this.setState({ timeout: newTimeout });
  }

  onButtonPress = () => {
    this.props.onFinish(this.state.coordinates);
    this.setState({ isModalOpen: false });
  }

  showModal = () => this.setState({ isModalOpen: true });

  render() {
    const { mapStyles, buttonContainerStyles, markerText, renderButton, renderInput } = this.props;
    const { coordinates, deltas, isPressing, isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent
          visible={isModalOpen}
          onRequestClose={() => {}}
        >
          <MapView
            style={mapStyles || styles.map}
            initialRegion={{ ...coordinates, ...deltas }}
            onRegionChange={this.onRegionChange}
            onPanDrag={this.onPanDrag}
          >
            {!isPressing && (
              <MapView.Marker
                coordinate={coordinates}
                title={markerText}
              />
            )}
          </MapView>
          <View style={buttonContainerStyles || styles.buttonContainer}>
            <TouchableOpacity onPress={this.onButtonPress}>
              {renderButton()}
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity activeOpacity={1} onPress={this.showModal}>
          {renderInput(coordinates)}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width,
    height,
  },
  buttonContainer: {
    position: 'absolute',
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
  },
});
