import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

//Action creator -> function which returns an action
//if action creators are async , redux thunk is used
//function returns async function with dispatch
export const signin = (formData, history) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    console.log(error);
  }
};
