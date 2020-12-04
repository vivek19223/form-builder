import {ADD_QUESTION, CLEAR_QUESTIONS} from '../actions/types';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, action.payload];
    case CLEAR_QUESTIONS:
      return defaultState;
    default:
      return state;
  }
};
