import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView, View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connectAlert } from '../components/Alert';

import { Icon, Container, Content } from 'native-base';

import { CustomHeader } from '../components/CustomHeader';
import { Map } from '../components/Map';
import { InputWithButtonLast } from '../components/TextInput';
import { SERVER_ADDRESS, STATIC_ADDRESS } from '../config/globals';

const initialState = {
  latitude: 33.64996,
  longitude: 73.15562,
  latitudeDelta: 0.0922 * 4,
  longitudeDelta: 0.0421 * 4,
};

const currentPos = {
  latitude: 33.64996,
  longitude: 73.15562,
};

const testMarkers = [
  {
    title: 'Test 2',
    coordinates: {
      latitude: 33.6422996,
      longitude: 73.15336112,
    },
    providerId: 'provider1',
    providerLogo: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  },
  {
    title: 'Test 1',
    coordinates: {
      latitude: 33.6433996,
      longitude: 73.1552262,
    },
    providerId: 'provider1',
    providerLogo: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  },
];

class Home extends Component {
  static propTypes = {
    alertWithType: PropTypes.func,
    navigation: PropTypes.object,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',

    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 20 }} />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      initialState,
      currentPos,
      searchQuery: 'empty',
      markers: [],
    };
  }

  componentWillMount() {
    console.log('Home Screen will mount');
  }

  getShops() {
    const url = `${SERVER_ADDRESS}search/item/${this.state.searchQuery}/lat/33.64996/lng/73.15562`;

    fetch(url)
      .then(response => response.json())
      .then((response) => {
        console.log('after to json ', response);
        const data = response && response.data;
        const newMarkers = [];

        for (const shop of data) {
          const shopData = {
            title: shop.name,
            coordinates: {
              latitude: shop.geo[0],
              longitude: shop.geo[1],
            },
            providerLogo: STATIC_ADDRESS + shop.profilePicture,
            rating: shop.rating[0].avgRating,
            providerId: shop._id,
          };

          newMarkers.push(shopData);
        }

        if (newMarkers.length === 0) {
          this.props.alertWithType('info', 'Sorry!', 'No Shop Found');
        }

        console.log('new Markers', newMarkers);

        this.setState({
          markers: newMarkers,
        });
      })
      .catch((err) => {
        console.log('err', err);
        this.props.alertWithType('error', 'Sorry!', err.toString());
      });
  }

  handlePressSearch = () => {
    console.log('press Search', SERVER_ADDRESS);

    this.setState({
      showDirection: false,
      markers: [],
    });

    this.getShops();
    // this.props.alertWithType('info', 'Sorry!', 'No Shop found for');
  };

  handleChangeText = (value) => {
    console.log('text changed', value);
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <Container>
        <CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
        <Content contentContainerStyle={styles.container} >
          <InputWithButtonLast
            buttonText="Go"
            onPress={this.handlePressSearch}
            placeholder="Search items"
            onChangeText={value => this.handleChangeText(value)}
          />

          <Map
            currentPos={this.state.currentPos}
            markers={this.state.markers}
            region={this.state.initialState}
            showDirection={this.state.showDirection}

          />
        </Content>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  $lightGreen: '#4cd964',

  container: {
    flex: 1,
  },
});

export default connectAlert(Home);
