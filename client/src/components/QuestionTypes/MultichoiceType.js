import React, {Component} from 'react';
import InputText from './InputText';

class Multichoice extends Component {
  state = {
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  };

  updateState = async (e, option) => {
    if (option === 1) await this.setState ({option1: e.target.value});
    if (option === 2) await this.setState ({option2: e.target.value});
    if (option === 3) await this.setState ({option3: e.target.value});
    if (option === 4) await this.setState ({option4: e.target.value});

    this.props.options (
      this.state.option1 +
        '^&*' +
        this.state.option2 +
        '^&*' +
        this.state.option3 +
        '^&*' +
        this.state.option4
    );
  };

  render () {
    return (
      <div>
        <InputText
          label="Option 1"
          value={this.state.option1}
          onChange={e => this.updateState (e, 1)}
          placeholder="Options...."
        />
        <InputText
          label="Option 2"
          value={this.state.option2}
          onChange={e => {
            this.updateState (e, 2);
          }}
          placeholder="Options...."
        />
        <InputText
          label="Option 3"
          value={this.state.option3}
          onChange={e => {
            this.updateState (e, 3);
          }}
          placeholder="Options...."
        />
        <InputText
          label="Option 4"
          value={this.state.option4}
          onChange={e => {
            this.updateState (e, 4);
          }}
          placeholder="Options...."
        />
      </div>
    );
  }
}

export default Multichoice;
