import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AsyncStorage } from 'react-native';
import { Icon, Container, Button, Content, Text, StyleProvider, List, ListItem, Left, Switch, Right, Body } from 'native-base';

import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import { SERVER_ADDRESS, STATIC_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';

class Account extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Account',
    drawerLabel: 'Account',
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-cog" style={{ fontSize: 20 }} />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      userDetails: {},
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
  }

  componentDidMount() {
    this.isUserLoggedIn();
  }

  getUserDetails() {
    const url = `${SERVER_ADDRESS}consumer/getconsumerdetails/${this.state.user.email}`;
    console.log('conversations url', url);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((response) => {
        console.log('response is ', response);
        const data = response && response.data;
        this.setState({ userDetails: data });
      })
      .catch((err) => {
        console.log('err', err);
        this.props.alertWithType('error', 'Sorry!', err.toString());
      });
  }

  isUserLoggedIn() {
    AsyncStorage.getItem('user').then((user) => {
      const userData = JSON.parse(user);
      if (user != null) {
        this.setState({
          isLoggedIn: true,
          user: userData,
        }, () => {
          this.getUserDetails();
        });
      } else {
        console.log(' User not logged in, Redirecting to login page');
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    console.log('User Details ', this.state.userDetails);

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Account Details" goback={() => this.props.navigation.goBack()} backButton />
          <Content contentContainerStyle={styles.container} >
            <List>
              <ListItem icon>
                <Left>
                  <Icon name="ios-person"/>
                </Left>
                <Body>
                  <Text>{this.state.userDetails.name}</Text>
                </Body>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Icon name="ios-mail" />
                </Left>
                <Body>
                  <Text>{this.state.userDetails.email}</Text>
                </Body>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Icon name="ios-call" />
                </Left>
                <Body>
                  <Text>{this.state.userDetails.phone}</Text>
                </Body>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Icon name="ios-add-circle" />
                </Left>
                <Body>
                  <Text>{this.state.userDetails.age}</Text>
                </Body>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Icon name="ios-home" />
                </Left>
                <Body>
                  <Text>{this.state.userDetails.address}</Text>
                </Body>
              </ListItem>

            </List>

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

export default connectAlert(Account);
