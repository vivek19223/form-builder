import React, {Component} from 'react';

import RadioType from './QuestionTypes/RadioType';
import MultichoiceType from './QuestionTypes/MultichoiceType';

class Question extends Component {
  state = {
    question: '',
    type: '',
    radioOptions: '',
    multiChoiceOptions: '',
  };

  componentDidUpdate () {
    this.props.onDataSubmit (this.state);
  }

  renderQuestionHelper = () => {
    if (this.state.type === 'radio') {
      return (
        <RadioType
          options={value =>
            this.setState ({radioOptions: value, multiChoiceOptions: ''})}
        />
      );
    }
    if (this.state.type === 'multichoice') {
      return (
        <MultichoiceType
          options={value =>
            this.setState ({multiChoiceOptions: value, radioOptions: ''})}
        />
      );
    }
  };

  render () {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <label>Question</label>
            <input
              type="text"
              placeholder="Type you question..."
              value={this.state.question}
              onChange={e => this.setState ({question: e.target.value})}
            />
          </div>
          <div className="field">
            <select
              onClick={e => this.setState ({type: e.target.value})}
              className="ui dropdown"
            >
              <option value="">Select Question Type</option>
              <option value="text">Text</option>
              <option value="radio">Single select radio</option>
              <option value="multichoice">Multichoice checkbox</option>
            </select>
          </div>
          {this.renderQuestionHelper ()}
        </form>
      </div>
    );
  }
}

export default Question;
