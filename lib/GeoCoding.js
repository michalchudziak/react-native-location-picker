import Geocoder from 'react-native-geocoder';

class GeoCoding {
  static getPosition(cb = (err,currentLocation) => {}) {
    navigator.geolocation.getCurrentPosition(
      (coords) => {
        let position = {
          latitude:coords.coords.latitude,
          longitude:coords.coords.longitude,
        }
        GeoCoding.getAdressFromPosition(position,(err, address) => {
          if (err) return cb(err);
          position.address = address;
          cb(null,position);
        })
      },
      (error) => {
        console.log(error);
        cb(error);
      }
    )
  }
  static getAdressFromPosition(coords, cb = (err, address) => {}) {
    const c = {lat:coords.latitude,lng:coords.longitude};
    Geocoder.geocodePosition(c).then( res => {
      let add = res[0];
      let address = {
        streetNumber: add.streetNumber,
        streetName: add.streetName,
        postalCode: add.postalCode,
        locality: add.locality, // city name
        country: add.country,
        adminArea: add.adminArea,
        subLocality:add.subLocality,
        formattedAddress: add.formattedAddress,
      }
      cb(null,address);
    })
    .catch( err => {
      console.log(err);
      cb(err);
    });
  }

  static getPositionFromAdress(address, cb = (err, coords) => {}) {
    Geocoder.geocodeAddress(address).then( res => {
      const addresses = res.map(add => {
        return {
          streetNumber: add.streetNumber,
          streetName: add.streetName,
          postalCode: add.postalCode,
          locality: add.locality, // city name
          country: add.country,
          adminArea: add.adminArea,
          subLocality:add.subLocality,
          formattedAddress: add.formattedAddress,
          position: add.position,
        }
      });
      cb(null,addresses);
    })
    .catch( err => {
      if (err.code == 'NOT_FOUND') {
        console.log("Vazio");
        cb(null,[]);
      }
      else {
        console.log(err);
        cb(err);
      }
    });
  }
}

export default GeoCoding;
