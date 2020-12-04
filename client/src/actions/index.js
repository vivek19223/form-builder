import history from '../history';
import api from '../apis/forms';
import generateSlug from '../utils/generateSlug';
import moment from 'moment';
import {
  SET_FORM_NAME,
  ADD_QUESTION,
  SUBMIT_FORM,
  CLEAR_FORM_NAME,
  CLEAR_QUESTIONS,
  FETCH_FORMS,
  FETCH_FORM,
  SUBMIT_RESPONSE,
  UPDATE_RESPONDED,
} from './types';
import formatQuestion from '../utils/adjustQuestionData';

const arr = [];

export const setFormName = name => {
  return {
    type: SET_FORM_NAME,
    payload: name,
  };
};

export const addQuestion = questionData => async dispatch => {
  const data = await formatQuestion (questionData);
  dispatch ({
    type: ADD_QUESTION,
    payload: data,
  });
  history.push ('/create');
};

export const clearFormName = () => {
  return {
    type: CLEAR_FORM_NAME,
  };
};

const clearQuestions = () => {
  return {
    type: CLEAR_QUESTIONS,
  };
};

export const submitForm = title => async (dispatch, getState) => {
  const {name, questions} = getState ();
  const timeStamp = moment.now ();
  const slug = generateSlug (arr);
  arr.push (slug);
  console.log (arr);
  const res = await api.post ('/forms/', {
    name: title,
    questions,
    id: slug,
    timeStamp,
    responses: 0,
  });
  dispatch ({
    type: SUBMIT_FORM,
    payload: res.data,
  });
  dispatch (clearFormName ());
  dispatch (clearQuestions ());
  history.push ('/');
};

export const fetchForms = () => async dispatch => {
  const res = await api.get ('/forms/');
  res.data.map (data => {
    if (!arr.includes (data.id)) arr.push (data.id);
  });
  dispatch ({
    type: FETCH_FORMS,
    payload: res.data,
  });
};

export const fetchForm = id => async dispatch => {
  const res = await api.get (`/forms/${id}`);
  dispatch ({
    type: FETCH_FORM,
    payload: res.data,
  });
};

export const updateResponse = (id, prevResponse) => async dispatch => {
  console.log ('flow comes here');
  const res = await api.patch (`/forms/${id}`, {responses: prevResponse + 1});
  console.log (res.data);
  dispatch ({
    type: UPDATE_RESPONDED,
    payload: res.data,
  });
};

export const submitResponse = (
  id,
  name,
  prevResponse,
  responseData
) => async dispatch => {
  const data = {formId: id, name, responseData};
  const res = await api.post ('/responses/', data);
  dispatch ({
    type: SUBMIT_RESPONSE,
    payload: res.data,
  });
  history.push ('/');
};
