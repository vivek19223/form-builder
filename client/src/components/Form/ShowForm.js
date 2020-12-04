import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchForm, submitResponse, updateResponse} from '../../actions';

class ShowForm extends Component {
  state = {
    options: [],
  };
  componentDidMount () {
    this.props.fetchForm (this.props.match.params.id);
  }

  componentDidUpdate () {
    this.initialLoad (this.props.form[0]);
  }

  initialLoad = data => {
    const arr = [];
    if (data) {
      if (this.state.options.length === 0) {
        for (const question of data.questions) {
          if (question.type === 'text') {
            arr.push ('');
          }
          if (question.type === 'radio') {
            arr.push ('');
          }
          if (question.type === 'multichoice') {
            arr.push ([]);
          }
        }
        this.setState ({options: arr});
      }
    }
  };

  onMultichoiceSelect = (index, value) => {
    return this.setState ({
      options: this.state.options.map ((ele, i) => {
        if (i === index) {
          if (ele.includes (value)) {
            return ele.filter (val => val !== value);
          }
          return [...ele, value];
        }
        return ele;
      }),
    });
  };

  renderQuestionFormat = (type, options, index) => {
    if (type === 'text') {
      return (
        <textarea
          type="text"
          rows="2"
          index={index}
          placeholder="Answer.."
          value={this.state.options[index]}
          onChange={e =>
            this.setState ({
              options: this.state.options.map ((ele, i) => {
                if (i === index) return (ele = e.target.value);
                return ele;
              }),
            })}
        />
      );
    }
    if (type === 'radio') {
      return (
        <div className="grouped fields">
          {options.map ((option, childIndex) => {
            return (
              <div className="field" key={option}>
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    index={index}
                    value={childIndex}
                    checked={
                      this.state.options[index] === childIndex
                        ? 'checked'
                        : null
                    }
                    onChange={e => {
                      this.setState ({
                        options: this.state.options.map ((ele, i) => {
                          if (i === index) {
                            return (ele = childIndex);
                          }
                          return ele;
                        }),
                      });
                    }}
                  />
                  <label>{option}</label>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    if (type === 'multichoice') {
      return (
        <div className="grouped fields">
          {options.map ((option, childIndex) => {
            return (
              <div className="field" key={option}>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    index={index}
                    value={childIndex}
                    onClick={e => this.onMultichoiceSelect (index, childIndex)}
                  />
                  <label>{option}</label>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  onFormSubmit = e => {
    e.preventDefault ();
    this.props.submitResponse (
      this.props.form[0].id,
      this.props.form[0].name,
      this.props.form[0].responses,
      this.state
    );
  };

  render () {
    const data = this.props.form[0];
    if (data) {
      return (
        <form className="ui form segment" onSubmit={e => this.onFormSubmit (e)}>
          <div className="ui clearing ">
            <div className="ui left floating header">{data.name}</div>
            {data.questions.map ((question, index) => {
              return (
                <div className="field" key={question.question}>
                  <label>{question.question}</label>
                  {this.renderQuestionFormat (
                    question.type,
                    question.options,
                    index
                  )}
                </div>
              );
            })}
          </div>
          <div className="field" />
          <button
            type="submit"
            className="ui field button positive right floated"
          >
            Submit
          </button>
          <div className="field" />
        </form>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = ({forms}, ownProps) => {
  return {
    form: Object.values (forms).filter (
      form => form.id === ownProps.match.params.id
    ),
  };
};

export default connect (mapStateToProps, {fetchForm, submitResponse}) (
  ShowForm
);
