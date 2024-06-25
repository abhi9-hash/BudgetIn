import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAIL } from "../userConstants";
import Axios from "axios";

export const userSignIn = (body, navigate) => async (dispatch) => {
 
  dispatch({
    type: SIGNIN_REQUEST,
  });
  try {
    console.log({ body });
    const {
      data: { data },
    } = await Axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/login`,
      body
    );
    dispatch({ type: SIGNIN_SUCCESS, payload: data.accessToken });
    localStorage.setItem("token", `Bearer ${data.accessToken}`);
    navigate("/home");
  } catch (error) {
    console.log({ error });
    dispatch({ type: SIGNIN_FAIL, payload: error.message });
  }
};
