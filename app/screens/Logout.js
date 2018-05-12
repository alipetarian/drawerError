import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import {
  View,
  AsyncStorage,
} from 'react-native';

import t from 'tcomb-form-native';
import { Icon, Container, Button, Content, Text, StyleProvider } from 'native-base';

import { SERVER_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';

const Form = t.form.Form;

const options = {
  fields: {
    email: {
      error: 'Email is required',
    },
    password: {
      error: 'Password is required',
      password: true,
      secureTextEntry: true,
    },
  },
};

class Logout extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Logout',
    drawerLabel: 'Logout',
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-person" style={{ fontSize: 20 }} />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      loggedIn: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
    this.logout();
  }

  logout() {
    AsyncStorage.removeItem('user').then( (user)=>{
      console.log('logged out user', user);
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content contentContainerStyle={styles.container} >

            <View style={styles.sigunpContainer}>
              <Text style={styles.signupText}>You are logged out !</Text>
              <Button
                primary
                rounded
                onPress={() => this.props.navigation.navigate('Home', { userLoggedout: true })}
              >
                {this.state.isFontLoaded && <Text> Go Back to Home </Text> }
              </Button>

            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default connectAlert(Logout);
