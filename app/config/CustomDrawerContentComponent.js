import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import { DrawerItems } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Image, StatusBar,  View,  AsyncStorage } from 'react-native';
import { Icon, Container, Header, Body, Button, Content, Text, StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import { STATIC_ADDRESS } from '../config/globals';

class CustomDrawerContentComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    loggedIn: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    //console.log('check if user is logged in',props.loggedIn);
    this.state = {
      isFontLoaded: false,
      isLoggedIn: false,
      user: {},
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    AsyncStorage.getItem('user').then((user) => {
      let userData = JSON.parse(user);

      if (user != null) {
        this.setState({
          isLoggedIn: true,
          user: userData,
        });
      }
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container style={styles.container}>
          <Header style={styles.drawerHeader}>
            <Body>

              { this.props.userLoggedIn &&
               <Text style={styles.whiteText}>Welcom from store</Text>
              }

              { this.state.isLoggedIn && this.state.user &&
                <View>
                  <Image style={styles.profilePic}source={{ uri: `${STATIC_ADDRESS}${this.state.user.picture}` }} />
                  <Text style={styles.whiteText}>{this.state.user.name}</Text>
                  <Text style={styles.whiteText}>{this.state.user.email}</Text>
                </View>
              }

              { !this.state.isLoggedIn &&
                <Text style={styles.whiteText}>Welcome Guest</Text>
              }

            </Body>
          </Header>
          <Content>
            <DrawerItems {...this.props} />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = EStyleSheet.create({
  $lightGreen: '#4cd964',

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#f6f6f6',
  },
  drawerHeader: {
    height: 150,
    backgroundColor: '$lightGreen',
  },

  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  whiteText: {
    color: '#fff',
  },

});

const mapStateToProps = (state) => {
  const userLoggedIn = state.userLoggedIn;

  return {
    userLoggedIn: userLoggedIn,
  };
};

export default connect(mapStateToProps)(CustomDrawerContentComponent);
