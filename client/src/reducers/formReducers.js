import _ from 'lodash';
import {
  SUBMIT_FORM,
  FETCH_FORMS,
  FETCH_FORM,
  SUBMIT_RESPONSE,
  UPDATE_RESPONDED,
} from '../actions/types';

const defaultState = {};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {...state, [action.payload.id]: action.payload};
    case FETCH_FORMS:
      return {...state, ..._.mapKeys (action.payload, 'id')};
    case FETCH_FORM:
      return {...state, [action.payload.id]: action.payload};
    case UPDATE_RESPONDED:
      return {...state, [action.payload.id]: action.payload};
    case SUBMIT_RESPONSE:
      return state;
    default:
      return state;
  }
};
