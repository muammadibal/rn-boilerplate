import { ActionType } from "../types";
import { TOGGLE_THEME } from "../types/appTypes";

const initialState = {
  theme: 'dark'
};

const appReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return state;
  }
};

export default appReducer;