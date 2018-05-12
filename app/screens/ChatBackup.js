import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';

import { Icon, Container, Button, Content, Text, StyleProvider } from 'native-base';
import { connectAlert } from '../components/Alert';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import { SERVER_ADDRESS } from '../config/globals';
import { CustomHeader } from '../components/CustomHeader';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  handlePressSearch = () => {
    console.log('press Search', SERVER_ADDRESS);
  };

  handleChangeText = () => {
    console.log('text changed');
  };



  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container style={styles.container}>
          <CustomHeader title="Conversations" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
          <Content style={{flex: 1, }}>

            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1,
              }}
            />
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

export default Chat;
