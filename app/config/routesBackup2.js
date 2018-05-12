import { StatusBar, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Test from '../screens/Test';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Account from '../screens/Account';
import Conversations from '../screens/Conversations';

let { height, width } = Dimensions.get('window');

const routeConfigs = {
  Home: {
    path: '/',
    screen: Home,
  },
  Login: {
    path: '/info',
    screen: Login,
  },
  Account: {
    screen: Account,
  },
  Signup: {
    screen: Signup,
  },
};

const drawerNavigatorConfig = {
  initialRouteName: 'Home',
  drawerWidth: width / 2,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerBackgroundColor: 'orange',
  contentOptions: {
    activeTintColor: 'red',
  },
  cardStyle: { paddingTop: StatusBar.currentHeight },
  style: {
    paddingTop: StatusBar.currentHeight,
    marginTop: 40,
  },
};

const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);

export default App;
