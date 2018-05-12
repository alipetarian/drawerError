import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './config/store';

EStyleSheet.build({
  $white: '#fff',
  $gray: '#444',
  $lightGray: '#f0f0f0',
  $lightGreen: '#4cd964',
  $darkGreen: '#28a745',
  $border: '#979797',
  $inputText: '#797979',
  $primaryBlue: 'blue',
});

export default () => (
  <AlertProvider>
    <Provider store={store}>
      <Navigator onNavigationStateChange={null} />
    </Provider>
  </AlertProvider>

);
