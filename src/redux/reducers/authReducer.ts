import { ActionType } from "../types";
import { SET_LOGIN_FAILED, SET_LOGIN_REQUEST, SET_LOGIN_SUCCESS, SET_LOGOUT_SUCCESS } from "../types/authTypes";

const initialState = {
  auth: null,
  authError: null,
  authLoading: null,
};

const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_LOGIN_REQUEST:
      return {
        ...state,
        auth: null,
        authError: null,
        authLoading: true,
      };
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        authError: null,
        authLoading: false,
      };
    case SET_LOGIN_FAILED:
      return {
        ...state,
        auth: null,
        authError: action.payload,
        authLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;