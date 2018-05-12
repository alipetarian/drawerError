import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, AsyncStorage } from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';

import { loginUser } from '../actions/login';
import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

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

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const User = t.struct({
  email: t.String,
  password: t.String,
});

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    drawerLabel: 'Login',
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
  }

  handleSubmit = () => {
    // using reducers to change value in redux

    this.props.dispatch(loginUser('Ali 9090'));

    const values = this._form.getValue(); // use that ref to get the form value
    console.log('values in Login form: ', values);

    let jsonValues;
    if (values !== null) {
      jsonValues = JSON.stringify(values);
    } else {
      console.log('values are empty');
    }

    this.loginUser(jsonValues);
  }

  loginUser(values) {
    const url = `${SERVER_ADDRESS}login/consumer`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: values,
    })
      .then(response => response.json())
      .then((response) => {
        console.log('in response');
        console.log('success is: ', response);
        if (response.success) {
          console.log('User Logged in');
          AsyncStorage.setItem('user', JSON.stringify(response));
          this.props.navigation.navigate('Home');

        } else {
          this.props.alertWithType('error', 'Sorry!', 'Wrong credenitals, Please try again');
        }
      })
      .catch((err) => {
        console.log('err', err);
        this.props.alertWithType('error', 'Sorry!', err.toString());
      });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Login" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content contentContainerStyle={styles.container} >
            <Form
              ref={c => this._form = c}
              type={User}
              options={options} // pass the options via props
            />
            <Button primary rounded onPress={this.handleSubmit}>{this.state.isFontLoaded && <Text> Login </Text> }</Button>
            <View style={styles.sigunpContainer}>
              <Text style={styles.signupText}>Do not have an account, Signup Now!</Text>
              <Button
                primary
                rounded
                onPress={() => this.props.navigation.navigate('Signup', { userCreated: true })}
              >
                {this.state.isFontLoaded && <Text> Signup </Text> }
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

export default connectAlert(connect()(Login));
