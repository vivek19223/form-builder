import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {clearFormName, fetchForms} from '../actions';

class ListForms extends Component {
  componentDidMount () {
    this.props.clearFormName ();
    this.props.fetchForms ();
  }

  renderList = () => {
    const data = this.props.forms;
    if (data) {
      return (
        <div className="ui relaxed divided list">
          {data.map (item => {
            return (
              <div className="item" key={item.id}>
                <i className="large sticky note outline middle aligned icon" />
                <div className="content">
                  <div className="header">{item.name}</div>
                  <Link className="header" to={`/show/${item.id}`}>
                    Link : {`${window.location.origin}/show/${item.id}`}
                  </Link>
                  <div className="description">
                    createdAt : {moment (item.timeStamp).format ('MMM Do,YYYY')}
                    <div className="right floated">
                      {item.responses}
                      <i className="large thumbs up icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      );
    }
    return <div />;
  };

  render () {
    return <div>{this.renderList ()}</div>;
  }
}

const mapStateToProps = ({forms}) => {
  return {
    forms: Object.values (forms),
  };
};

export default connect (mapStateToProps, {clearFormName, fetchForms}) (
  ListForms
);
