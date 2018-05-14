import React, { Component } from 'react';

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Autocomplete from 'react-native-autocomplete-input';

import GeoCoding from '../lib/GeoCoding';

const { height, width } = Dimensions.get('window');

class SearchAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:{
        text:"",
        selectedCoord:{
          latitude:0,
          longitude:0,
        },
        selectedAddress:"",
      },
      searchResults:[],
    }
  }

  componentDidMount() {

  }

  valueChanged({value, key, property}) {
    var newState = Object.assign({},this.state);
    if (key) newState[key][property] = value;
    else newState[property] = value;
    this.refreshData(newState);
  }

  refreshData = data => {
    this.setState(data);
  }

  onChangeText(text) {
    this.valueChanged({value:text, key:'search', property:'text'});
  }

  onPickLocation(item) {
    const {position,formattedAddress} = item;
    this.valueChanged(
      {value:{latitude:position.lat,longitude:position.lng},
      key:'search',
      property:'selectedCoord',
    });
    this.valueChanged({
      value:formattedAddress,
      key:'search',
      property:'text',
    });
    this.valueChanged({
      value:formattedAddress,
      key:'search',
      property:'selectedAddress',
    });
    this.valueChanged({
      value:[],
      property:'searchResults',
    });
    this.props.onSelectAddress({
      formattedAddress:formattedAddress,
      position:{latitude:position.lat,longitude:position.lng},
    });
  }

  onPressGoButton() {
    const address = this.state.search.text;
    GeoCoding.getPositionFromAdress(address,(err,searchResults) => {
      if (err) {
        console.log(err);
        alert(err);
      }
      else {
        this.valueChanged({value: searchResults,property: 'searchResults'})
      }
    })
  }

  renderAutocompleteItem(item) {
    const { formattedAddress, position } = item;
    return (
      <TouchableOpacity
        onPress={() => this.onPickLocation(
          {position:position,
          formattedAddress:formattedAddress}
      )}>
        <Text style={styles.itemText}>
          {formattedAddress}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSearch() {
    let input = this.props.renderSearchInput(this.onChangeText.bind(this));
    let button = this.props.renderSearchButton(this.onPressGoButton.bind(this));
    let autoComplete = (
      <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={this.state.searchResults}
          defaultValue={this.state.search.text}
          onChangeText={text => this.valueChanged(text,'search','text')}
          placeholder="this.props.searchModalTitle"
          renderItem={this.renderAutocompleteItem.bind(this)}
          renderTextInput={(props) => (
            <View style={styles.container}>
              {this.props.renderSearchInput(this.state.search.text, this.onChangeText.bind(this))}
              {this.props.renderSearchButton(this.onPressGoButton.bind(this))}
            </View>
          )}
        />
      )
    return autoComplete;
  }

  render() {
    const { isModalOpen } = this.state.search;
    return (
      <View>
        {this.renderSearch()}
      </View>
    )
  }
}

SearchAddress.propTypes = {
  goButtonTitle: PropTypes.string,
  searchModalTitle: PropTypes.string,
  searchModalButtonOk: PropTypes.string,
  searchModalButtonCancel: PropTypes.string,
  onSelectAddress: PropTypes.func.isRequired,
  renderSearchInput: PropTypes.func,
  renderSearchButton: PropTypes.func,
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      position:'relative',
    },
    textInput: {
      width: 0.8 * width,
      height: 30,
      borderColor: 'gray',
      backgroundColor: 'white',
      borderWidth: 1
    },
  }
)

export default SearchAddress;
