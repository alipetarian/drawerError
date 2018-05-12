import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Content, Header, Body } from 'native-base';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import React from 'react';

import {
  Image,
  StatusBar,
} from 'react-native';


import CustomDrawerContentComponent from './CustomDrawerContentComponent';
import Home from '../screens/Home';
import Test from '../screens/Test';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Logout from '../screens/Logout';
import Account from '../screens/Account';
import Conversations from '../screens/Conversations';
import Chat from '../screens/Chat';

const routeConfigs = {
  Home: {
    screen: Home,
  },
  Account: {
    screen: Account,
  },
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  Conversations: {
    screen: Conversations,
  },
  Logout: {
    screen: Logout,
  },
  Test: {
    screen: Test,
  },
  Chat: {
    screen: Chat,
  },
};

const drawerNavigatorConfig = {
  initialRouteName: 'Login',
  drawerPosition: 'left',
  contentComponent: props => <CustomDrawerContentComponent {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  order: ['Home', 'Conversations', 'Account', 'Signup', 'Login', 'Logout','Chat'],
};

const MyApp = DrawerNavigator(routeConfigs, drawerNavigatorConfig);

export default MyApp;
