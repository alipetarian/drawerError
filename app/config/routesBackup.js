import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Test from '../screens/Test';
import Chat from '../screens/Chat';

const HomeStack = StackNavigator({
  Chat: {
    screen: Chat,
    navigationOptions: {
      header: () => null,
      headerTitle: 'Home',
    },
  },

  Test: {
    screen: Test,
    navigationOptions: {
      header: () => null,
      headerTitle: 'Home',
    },
  },

  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
      headerTitle: 'Home',
    },
  },
});

export default StackNavigator(
  {
    // Chat: {
    //   screen: HomeStack,
    // },

    // Test: {
    //   screen: HomeStack,
    // },

    Home: {
      screen: HomeStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
