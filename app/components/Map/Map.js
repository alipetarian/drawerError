import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';

import ShopCallout from './ShopCallout';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../config/globals';

const origin = {
  coordinates: { latitude: 33.64996, longitude: 73.15562 },
  title: 'origin',
  desc: 'Origion Description here',
};

const destination = {
  coordinates: { latitude: 33.644393, longitude: 73.163949 },
  title: 'Destination',
  desc: 'Destination Description here',
};

const { width, height } = Dimensions.get('window');

const handleMarkerPress = (marker) => {
  console.log('maker is pressed');
  //console.log(marker);
};

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDirection: false,
      isMapReady: false,
      markers: props.markers,
      region: props.region,
      currentPos: props.currentPos,
      destination: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('new markers in Map', nextProps.markers.length);

    this.setState({
      markers: nextProps.markers,
      showDirection: nextProps.showDirection,
    });

    this.onMapLayout();
  }

  onMapLayout = () =>{
    this.map.fitToElements(true);
    this.setState({ isMapReady: true });
  }

  onRegionChange =(region) => {
  }

  handleCalloutPress = (marker) => {
    console.log('Callout is pressed');

    this.shopMarkers.hideCallout();

    Alert.alert(
      'Select an Option',
      marker.title,
      [
        { text: 'Chat ', onPress: () => console.log('Chat  is Pressed')},
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Navigate', onPress: () => this.handleNavigatePress(marker) },
      ],
      { cancelable: false },
    );
  };

  handleNavigatePress= (marker) => {
    console.log('Navigate pressed in messate');
    console.log('maker is ', marker);
    this.setState({
      destination: marker,
      showDirection: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => this.map = ref}
          fitToElements={MapView.ANIMATED_FIT}
          onLayout={this.onMapLayout}
          region={this.state.region}
          onMapReady= {(result) => {
            this.onMapLayout();
          }}
        >

          { this.state.isMapReady && !this.state.showDirection &&
            <Marker
              style={styles.currentPosPin}
              coordinate={this.state.currentPos}
              title="Current Position"
            />
          }
          {
            this.state.isMapReady && !this.state.showDirection && this.state.markers && this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                ref={ref => this.shopMarkers = ref}
                coordinate={marker.coordinates}
                onPress={() => handleMarkerPress(marker)}
                onLoad={() => console.log('Maker is loaded ')}
              >
                <ShopCallout
                  title={marker.title}
                  marker={marker}
                  onPressCallout={()=> this.handleCalloutPress(marker)}
                  rating={marker.rating}
                />
              </Marker>
            ))
          }

          { this.state.showDirection &&
            <Marker
              style={styles.mainLocPin}
              coordinate={this.state.destination.coordinates}
              title={this.state.destination.title}
            />
          }

          { this.state.showDirection &&
            <Marker
              style={styles.mainLocPin}
              coordinate={origin.coordinates}
              title="Your Current Location"
            />
          }

          { this.state.showDirection &&
            <MapViewDirections
              origin={this.state.currentPos}
              destination={this.state.destination.coordinates}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="green"
              onReady={(result) => {
                this.map.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
            />
          }
        </MapView>
      </View>
    );
  }

};

Map.propTypes = {
  currentPos: PropTypes.object,
  isMapReady: PropTypes.bool,
  markers: PropTypes.array,
  showDirection: PropTypes.bool,
};

export default Map;

// ref={ref => this.map = ref}
