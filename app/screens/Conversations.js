import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AsyncStorage } from 'react-native';
import { Icon, Container, Button, Content, Text, StyleProvider, List, ListItem, Thumbnail, Body } from 'native-base';

import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';


import { SERVER_ADDRESS, STATIC_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';

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
      conversations: [],
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
    //this.getChats();
  }

  componentDidMount() {
    this.isUserLoggedIn();
  }

  getChats() {
    const url = `${SERVER_ADDRESS}getConsumerChats/${this.state.user._id}`;
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

        const newCon = [];

        for (const chat of data) {
          const chatData = {
            chatId: chat._id,
            providerName: chat.providerName,
            providerId: chat.providerId,
            providerLogo: STATIC_ADDRESS + chat.providerPicture,
            lastMessage: chat.lastMessage,
            lastMessageTime: chat.lastMessageTime,
          };
          newCon.push(chatData);
        }

        console.log('New Chats', newCon);

        this.setState({
          conversations: newCon,
        });
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
          console.log('///////////////////////////');
          this.getChats();
        });
      } else {
        console.log(' User not logged in, Redirecting to login page');
        this.props.navigation.navigate('Login');
      }
    });
  }

  handleSubmit = (chatId, providerName, providerId) => {
    console.log('Chat Pressed', chatId, ' ', providerName, providerId);
    this.props.navigation.navigate('Chat', { chatId, providerName, providerId });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <CustomHeader title="Conversations" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content contentContainerStyle={styles.container} >
            <List>

              {
                this.state.conversations && this.state.conversations.map((chat, index) => (
                  <ListItem key={index} onPress={() => this.handleSubmit(chat.chatId, chat.providerName, chat.providerId)}>
                    <Thumbnail square size={80} source={{ uri: chat.providerLogo }} />
                    <Body>
                      <Text>{chat.providerName}</Text>
                      <Text note>{chat.lastMessage}</Text>
                    </Body>
                  </ListItem>
                ))
              }
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

export default connectAlert(Conversations);
