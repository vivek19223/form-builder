import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal (
    <div className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation ()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        {props.error
          ? <div className="ui error message">
              <div className="field">
                <div className="header">
                  *All fields are mandatory.
                </div>
              </div>
            </div>
          : ''}
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.action ()}
        </div>
      </div>
    </div>,
    document.querySelector ('#modal')
  );
};

export default Modal;
