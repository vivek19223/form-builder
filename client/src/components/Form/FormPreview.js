import React from 'react';
import {connect} from 'react-redux';

import {submitForm} from '../../actions';

const FormPreview = props => {
  const renderQuestionFormat = ({question, type, options}, index) => {
    if (type === 'text') {
      return <input type="text" placeholder="Answer.." />;
    } else if (type === 'radio') {
      return options.map (option => {
        return (
          <div className="field" key={option}>
            <div className="ui radio checkbox">
              <input type="radio" tabIndex="0" className="hidden" />
              <label>{option}</label>
            </div>
          </div>
        );
      });
    } else {
      return options.map (option => {
        return (
          <div className="field" key={option}>
            <div className="ui checkbox">
              <input type="checkbox" />
              <label>{option}</label>
            </div>
          </div>
        );
      });
    }
  };

  const renderQuestion = () => {
    if (props.questions.length > 0) {
      return props.questions.map ((question, index) => {
        return (
          <div key={index}>
            <form className="ui form">
              <div className="field">
                <label><h4>{index + 1}.{question.question}</h4></label>
                {renderQuestionFormat (question, index)}
              </div>
            </form>
          </div>
        );
      });
    }
  };

  const renderPreview = () => {
    if (props.name) {
      return (
        <div>
          <div className="ui clearing segment">
            <h3 className="ui left floated header">Preview : {props.title}</h3>
            <button
              className="ui right floated button primary "
              onClick={() => {
                props.submitForm (props.title);
              }}
            >
              Submit
            </button>
          </div>
          <div className="ui container">{renderQuestion ()}</div>
        </div>
      );
    }
    return <div />;
  };

  return <div>{renderPreview ()}</div>;
};

const mapStateToProps = ({name, questions}) => {
  return {name, questions};
};

export default connect (mapStateToProps, {submitForm}) (FormPreview);
