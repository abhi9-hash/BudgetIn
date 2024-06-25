const {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
} = require("../userConstants");

export const signInReducers = (
  state = { loading: false, token: null, error: false },
  action
) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return { loading: false, token: action.payload };
    case SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
