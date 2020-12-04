import {SET_FORM_NAME, CLEAR_FORM_NAME} from '../actions/types';

const defaultState = '';
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_FORM_NAME:
      return action.payload;
    case CLEAR_FORM_NAME:
      return defaultState;
    default:
      return state;
  }
};
