import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$primaryBlue',
  },

  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: '$lightGreen',
  },

  icon: {
    paddingLeft: 10,
  }
});
