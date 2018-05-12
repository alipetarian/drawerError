import { LOGIN_USER } from '../actions/login';

const initialState = {
  userLoggedIn: false,
  currentUser: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoggedIn: true,
        currentUser: action.userData || {},
      };

    default:
      return state;
  }
};
