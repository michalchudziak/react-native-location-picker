import React, { Component } from 'react';
/*
** Refactoring based on braking changes of 15.5 version of react
** React.PropTypes has moved into a different package since React v15.5.
** Please use the prop-types library instead.
 */
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window');
class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        latitude: props.location.latitude,
        longitude: props.location.longitude,
      },
      deltas: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      timeout: null,
      isPressing: false,
      isModalOpen: false,
    }
  }

  // This is not a good way to update state from properties, prefer getDerivedStateFromProps()
  // componentWillReceiveProps(nextProps) {
  //   const { location } = nextProps;
  //   if (location) {
  //     let coord = {
  //       ...location,
  //       latitudeDelta:this.state.latitudeDelta,
  //       longitudeDelta:this.state.longitudeDelta,
  //     }
  //     this.setState({ coordinates: coord });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location } = nextProps;
    if (location) {
      return {...prevState, coordinates:{...location}}
    }
    return null;
  }

  onRegionChange = ({ latitude, longitude }) => {
    this.setState({ coordinates: {latitude, longitude} });
  }

  onButtonPress = () => {
    this.props.onFinish(this.state.coordinates);
    this.setState({ isModalOpen: false });
  }

  showModal = () => {
    this.setState({ isModalOpen: true })
  };

  render() {
    const {
      buttonContainerStyles,
      mapStyles,
      markerImage,
      markerText,
      markerView,
      renderButton,
      renderInput,
    } = this.props;
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
              <Marker
                coordinate={coordinates}
                image={markerImage}
                title={markerText}
              >
                {!!markerView && markerView}
              </Marker>
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

LocationPicker.propTypes = {
  location: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  renderInput: PropTypes.func.isRequired,
  markerText: PropTypes.string,
  markerView: PropTypes.node,
  markerImage: PropTypes.number,
  buttonContainerStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  mapStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
}

export default LocationPicker;

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
