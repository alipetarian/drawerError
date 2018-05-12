import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView, View } from 'react-native';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';

import { Icon, Container, Button, Content, Text, StyleProvider, Header, Title, Body, Thumbnail, List, ListItem } from 'native-base';
import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import { SERVER_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';

class Chat extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    drawerLabel: 'Chat',
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-cog" style={{ fontSize: 20 }} />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      providerName: this.props.navigation.state.params.providerName,
      chatId: this.props.navigation.state.params.chatId,
      providerId: this.props.navigation.state.params.providerId,
      messages: [],
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
    this.getMessages();
  }

  onSend(messages = []) {
    const msgText = messages[0].text;

    console.log(msgText);

    const values = {};

    values.consumerId = '5ab0fbfb2eaa7525b4145e2d';
    values.providerId = '5ab20ff28f433818787afdc5';
    values.messageTo = '5ab20ff28f433818787afdc5';
    values.messageFrom = '5ab0fbfb2eaa7525b4145e2d';
    values.message = msgText;

    const url = `${SERVER_ADDRESS}insertMessage/`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then((response) => {
        console.log('Inserting message response: ', response);
      })
      .catch((err) => {
        console.log('err', err);
        this.props.alertWithType('error', 'Sorry!', err.toString());
      });

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  getMessages() {
    const url = `${SERVER_ADDRESS}getChatById/${this.state.chatId}`;
    console.log('messages url', url);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((response) => {
        console.log('Messages from server', response);
        const messages = response && response.data[0].messages;
        const chatMsgs = [];

        let count = 1;
        for (const message of messages) {
          console.log('provider id is', this.state.providerId, 'from message provider Id', message.messageFrom);
          const messageData = {
            _id: count,
            text: message.message,
            createdAt: message.time,
            user: {
              _id: this.state.providerId == message.messageFrom ? 2 : 1,
              name: 'React Native',
              avatar: 'http://ec2-52-53-207-46.us-west-1.compute.amazonaws.com:3000/assets//provider//download.png',
            },
          };

          chatMsgs.push(messageData);
          count = ++count;
        }
        // Reversing Chate mesages to make Gifted Chat Happy

        chatMsgs.reverse();
        this.setState({
          messages: chatMsgs,
        });
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
          <CustomHeader title={`${this.state.providerName}`} goback={() => this.props.navigation.goBack()} backButton />
          <Content contentContainerStyle={styles.container} >
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              inverted
              user={{
                _id: 1,
              }}
            />
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} />
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

export default connectAlert(Chat);
