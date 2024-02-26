import { SET_LOGIN_FAILED, SET_LOGIN_REQUEST, SET_LOGIN_SUCCESS } from "../types/authTypes";

export const setLoginRequest = () => ({
  type: SET_LOGIN_REQUEST,
});

export const setLoginSuccess = (payload: any) => ({
  type: SET_LOGIN_SUCCESS,
  payload
});

export const setLoginFailed = (payload: any) => ({
  type: SET_LOGIN_FAILED,
  payload
});