import { combineReducers } from "redux";
import appReducer from "./appReducer";
import { SET_LOGOUT_SUCCESS } from "../types/authTypes";
import authReducer from "./authReducer";

const combineAppReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})
const rootReducer = (state: any, action: { type: string; payload: any; }) => {
    if (action.type === SET_LOGOUT_SUCCESS) {
        return {
            ...state,
            auth: authReducer(undefined, action)
        };
    }
    return combineAppReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export const appSelector = (state: RootState) => state.app
export const authSelector = (state: RootState) => state.auth

export default rootReducer