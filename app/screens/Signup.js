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
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import t from 'tcomb-form-native';
import { Icon, Container, Button, Content, Text, StyleProvider, } from 'native-base';

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

const Gender = t.enums({
  Male: 'Male',
  Female: 'Female',
});

const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  age: t.Number,
  gender: Gender,
  phone: t.Number,
  address: t.String,

});

class Signup extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Signup',
    drawerLabel: 'Signup',
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-person-add" style={{ fontSize: 20 }} />
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
    const values = this._form.getValue(); // use that ref to get the form value
    console.log('values in Signup form: ', values);

    let jsonValues;
    if (values !== null) {
      jsonValues = JSON.stringify(values);
    } else {
      console.log('values are empty');
    }

    this.signupUser(jsonValues);
  }

  signupUser(values) {
    const url = `${SERVER_ADDRESS}register/consumer`;

    const headers = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: values,
    };

    fetch(url, headers)
      .then(response => response.json())
      .then((response) => {
        console.log('User is created', response);
        this.props.navigation.navigate('Login', { userCreated: true });
      });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Signup" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content contentContainerStyle={styles.container} >
            <ScrollView style={styles.scrollView}>
              <Form
                ref={c => this._form = c}
                type={User}
                options={options} // pass the options via props
              />
              <Button primary rounded onPress={this.handleSubmit}>
                {this.state.isFontLoaded && <Text> Signup </Text> }
              </Button>
            </ScrollView>
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

  scrollView: {
    paddingBottom: 20,
  },

});

export default connectAlert(Signup);
