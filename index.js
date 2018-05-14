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

import SearchAddress from './components/SearchAddress';

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
      isSelectedAddress: false,
      selectedAddress:{},
      selectedCoordinates: {
        latitude: props.location.latitude,
        longitude: props.location.longitude,
      }
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

  onOkButtonPress = () => {
    this.props.onFinish(this.state.selectedAddress);
    this.setState({ isModalOpen: false, selectedCoordinates: Object.assign({},this.state.coordinates) });
  }

  onCancelButtonPress = () => {
    this.props.onFinish();
    this.setState({ isModalOpen: false });
  }

  onSelectAddress(address) {
    this.setState({ selectedAddress: address });
    this.setState({coordinates:address.position});
  }

  showModal = () => {
    this.setState({ coordinates: Object.assign({},this.state.selectedCoordinates)})
    this.setState({ isModalOpen: true })
  };

  renderSearch(renderSearchInput,renderSearchButton) {
    if (renderSearchInput && renderSearchButton) {
      return (
        <SearchAddress
          goButtonTitle={this.props.goButtonTitle || 'Go'}
          searchModalTitle={this.props.searchModalTitle || 'Select address'}
          searchModalButtonOk={this.props.searchModalOk || 'Go'}
          searchModalButtonCancel={this.props.searchModalCancel || 'Cancel'}
          onSelectAddress={this.onSelectAddress.bind(this)}
          renderSearchInput={renderSearchInput}
          renderSearchButton={renderSearchButton}
        />
      )
    }
    return null;
  }

  render() {
    const {
      buttonContainerStyles,
      searchContainerStyles,
      mapStyles,
      markerImage,
      markerText,
      markerView,
      renderOkButton,
      renderCancelButton,
      renderSearchInput,
      renderSearchButton,
      renderInput,
    } = this.props;
    const { selectedCoordinates, coordinates, deltas, isPressing, isModalOpen } = this.state;

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
            region={{ ...coordinates, ...deltas }}
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
          {/* <View
            style={styles.mapInstrumentsContainer}
          >

          </View> */}
          <View style={searchContainerStyles || styles.searchContainer}>
            {this.renderSearch(renderSearchInput,renderSearchButton)}
          </View>
          <View style={buttonContainerStyles || styles.buttonContainer}>
            <TouchableOpacity onPress={this.onOkButtonPress}>
              {renderOkButton()}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCancelButtonPress}>
              {renderCancelButton()}
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity activeOpacity={1} onPress={this.showModal}>
          {renderInput(selectedCoordinates)}
        </TouchableOpacity>
      </View>
    );
  }
}

LocationPicker.propTypes = {
  goButtonTitle: PropTypes.string,
  searchModalTitle: PropTypes.string,
  searchModalButtonOk: PropTypes.string,
  searchModalButtonCancel: PropTypes.string,
  location: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
  renderOkButton: PropTypes.func.isRequired,
  renderCancelButton: PropTypes.func.isRequired,
  renderSearchInput: PropTypes.func,
  renderSearchButton: PropTypes.func,
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
  searchContainerStyles: PropTypes.oneOfType([
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
  mapInstrumentsContainer: {
    position: 'absolute',
    width,
    flexDirection: 'column',
    justifyContent: 'center',
    top: 20,
  },
  buttonContainer: {
    position: 'absolute',
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
  },
  searchContainer: {
    position: 'absolute',
    width,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 20,
  },
});
