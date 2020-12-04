import {combineReducers} from 'redux';
import formNameReducer from './formNameReduce';
import questionReducer from './questionReducer';
import formReducers from './formReducers';
export default combineReducers ({
  name: formNameReducer,
  questions: questionReducer,
  forms: formReducers,
});
