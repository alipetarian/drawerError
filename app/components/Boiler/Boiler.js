import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Boiler = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

Boiler.propTypes = {
  children: PropTypes.any,
};

export default Boiler;
