import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Container, Button, Content, Text, StyleProvider, List, ListItem } from 'native-base';

import { StatusBar, KeyboardAvoidingView, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';


import { InputWithButtonLast } from '../components/TextInput';
import { SERVER_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';
import { isUserLoggedIn } from '../config/commons';

class Conversations extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Conversations',
    drawerLabel: 'Conversations',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-chatbubbles" style={{ fontSize: 20 }} />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

    //console.log(isUserLoggedIn);

  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Conversations" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content contentContainerStyle={styles.container}>
            <List>
              <ListItem>
                <Text>Simon Mignolet</Text>
              </ListItem>
              <ListItem>
                <Text>Nathaniel Clyne</Text>
              </ListItem>
              <ListItem>
                <Text>Dejan Lovren</Text>
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
  },
});

export default Conversations;
