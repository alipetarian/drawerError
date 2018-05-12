import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Alert } from 'react-native';

import ShopCallout from './ShopCallout';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../config/globals';

const origin = { latitude: 33.64996, longitude: 73.15562 };
const destination = { latitude: 33.644393, longitude:  73.163949 };


const handleMarkerPress = (marker) => {
  console.log('maker is pressed');
  //console.log(marker);
};

const handleCalloutPress = (marker) => {
  console.log('Callout is pressed');

  this.shopMarkers.hideCallout();
  console.log(marker);
  Alert.alert(
    'Select an Option',
    marker.title,
    [
      { text: 'Chat ', onPress: () => console.log('Chat is Clicked') },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Navigate', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
};

const Map = (props) => {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        fitToElements={MapView.ANIMATED_FIT}
        {...props}
      >
        <Marker
          style={styles.mainLocPin}
          coordinate={props.currentPos}
        />
        {
          props.isMapReady && props.markers.map((marker, index) => (
            <Marker
              key={index}
              ref={ref => this.shopMarkers = ref}
              coordinate={marker.coordinates}
              onPress={() => handleMarkerPress(marker)}
            >
              <ShopCallout
                title={marker.title}
                marker={marker}
                onPressCallout={()=>handleCalloutPress(marker)}
              />
            </Marker>
          ))
        }

        { props.showDirection &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="green"
          />

        }

      </MapView>
    </View>
  );
};

Map.propTypes = {
  currentPos: PropTypes.object,
  isMapReady: PropTypes.bool,
  markers: PropTypes.array,
  showDirection: PropTypes.bool,
};

export default Map;

// ref={ref => this.map = ref}
