const {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
  ANALYTICS_FAIL,
  ACTIVITY_SUCCESS,
  SIGNUP_SUCCESS
} = require("../userConstants");

export const workspacelistReducers = (
  state = { loading: true, workspaces: [], error: false },
  action
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return { loading: false, workspaces: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const analyticsReducers = (
  state = { loading: true, workspaces: {}, error: false },
  action
) => {
  switch (action.type) {
    case ANALYTICS_REQUEST:
      return {
        loading: true,
      };
    case ANALYTICS_SUCCESS:
      return { loading: false, workspace_analytics: action.payload };
    case ACTIVITY_SUCCESS:
      return { loading: false, workspace_activity: action.payload };
      case SIGNUP_SUCCESS:
        return { loading: false, weekly_signups: action.payload };
    case ANALYTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workspaceDetailsReducers = (
  state = { loading: true, workspace: {}, error: false },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return { loading: false, workspace: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
