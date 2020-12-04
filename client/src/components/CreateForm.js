import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {setFormName} from '../actions';
import FormPreview from './Form/FormPreview';

class CreateForm extends Component {
  state = {
    title: this.props.name ? this.props.name : '',
    error: '',
  };

  componentWillUnmount () {
    if (this.state.title) return this.props.setFormName (this.state.title);
  }

  updateState = e => {
    if (e.target.value)
      return this.setState ({title: e.target.value, error: ''});
    this.setState ({error: 'e', title: ''});
  };

  render () {
    return (
      <div>

        <form>
          <div className="ui field">
            {this.state.error
              ? <div className="field error">
                  <div style={{color: 'red'}}>
                    *mandatory
                  </div>
                </div>
              : ''}
          </div>
          <div
            className={`ui large icon action input ${this.state.error ? 'error' : ''} focus`}
          >
            <input
              placeholder="Form Name"
              value={this.state.title}
              onChange={e => this.updateState (e)}
            />
            <Link
              className={`ui button ${this.state.error ? 'negative' : 'primary'}`}
              to={this.state.error || !this.state.title ? '/create' : '/add'}
            >
              Add Question
            </Link>

          </div>
        </form>
        <div className="ui segment">
          <FormPreview title={this.state.title} />

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({name}) => {
  return {name};
};

export default connect (mapStateToProps, {setFormName}) (CreateForm);
