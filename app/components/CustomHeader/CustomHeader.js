import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Font } from 'expo';

import { Header, Body, Title, Left, Icon, Right } from 'native-base';

import styles from './styles';

class CustomHeader extends Component {
  static propTypes ={
    title: PropTypes.string,
    drawerOpen: PropTypes.func,
    goback: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
  }

  render() {
    return (
      <Header style={styles.header}>
        <Left>
          { this.props.backButton &&
            <Icon style={styles.icon} name="ios-arrow-back" onPress={() => this.props.goback() } />
          }

          { !this.props.backButton &&
            <Icon style={styles.icon} name="ios-menu" onPress={() => this.props.drawerOpen()} />
          }
        </Left>

        <Body>
          { this.state.isFontLoaded &&
            <Title>{this.props.title}</Title>
          }
        </Body>
        <Right />
      </Header>
    );
  }
}


export default CustomHeader;

