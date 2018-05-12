import {AsyncStorage,} from 'react-native';

const LoggedInUser = () => {
  let LoggedUser = null;
  console.log('In logged in sub function ');
  AsyncStorage.getItem('user').then((user) => {
    const userData = JSON.parse(user);

    if (user != null) {
      LoggedUser = user;
    }
  });
  return LoggedUser;
};


export default LoggedInUser;
