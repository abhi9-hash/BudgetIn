import {
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
  SIGNUP_SUCCESS,
} from "../userConstants";
import Axios from "axios";

export const listWorkspaces =
  (criteria, search, navigate) => async (dispatch) => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    try {
      const {
        data: { data },
      } = await Axios.get(
        `${process.env.REACT_APP_BASE_URL}/searchworkspace/extractworkspaceid?criteria=${criteria}&search_string=${search}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      dispatch({ type: USER_LIST_SUCCESS, payload: data.Workspaces });
      navigate("/search");
    } catch (error) {
      dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
  };

export const workspacesAnalytics =
  (type, startDate, endDate) => async (dispatch) => {
    dispatch({
      type: ANALYTICS_REQUEST,
    });
    let url = `${process.env.REACT_APP_BASE_URL}/${type}`;
    if (type === "weeklysignups")
      url = `${process.env.REACT_APP_BASE_URL}/${type}?from_date=${startDate}&to_date=${endDate}`;
    try {
      const {
        data: { data },
      } = await Axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(data);

      dispatch({
        type:
          type === "workspacesactivity"
            ? ACTIVITY_SUCCESS
            : type === "weeklysignups"
            ? SIGNUP_SUCCESS
            : ANALYTICS_SUCCESS,
        payload: type === "workspacesactivity" ? data.workspace_activity : data,
      });
    } catch (error) {
      dispatch({ type: ANALYTICS_FAIL, payload: error.message });
    }
  };

export const workspaceDetails = (id) => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(
      `${process.env.REACT_APP_BASE_URL}/searchworkspace/workspacedetail?id=${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log({ data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
