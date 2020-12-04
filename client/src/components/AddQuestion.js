import React, {useState} from 'react';
import {connect} from 'react-redux';

import {addQuestion} from '../actions';
import Modal from './Modal';
import Question from './Question';

import adjustQuestionData from '../utils/adjustQuestionData';

const AddQuestion = props => {
  const [questionData, setQuestionData] = useState ({});
  const [error, setError] = useState ('');
  const renderQuestion = () => {
    return (
      <Question
        onDataSubmit={data => {
          setQuestionData (data);
        }}
      />
    );
  };

  const validateQuestionData = async () => {
    const question = await adjustQuestionData (questionData);
    if (question.question && question.type) {
      if (
        question.type === 'text' ||
        (question.type !== 'text' && !question.options.includes (''))
      ) {
        setError ('');
        props.addQuestion (questionData);
      }
    }
    setError ('error');
  };

  const action = () => {
    return (
      <React.Fragment>
        <button
          className="ui button primary"
          onClick={() => validateQuestionData ()}
        >
          Submit question
        </button>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Modal
        title={props.name}
        content={renderQuestion ()}
        action={action}
        error={error}
      />
    </div>
  );
};

const mapStateToProps = ({name}) => {
  return {name};
};

export default connect (mapStateToProps, {addQuestion}) (AddQuestion);
