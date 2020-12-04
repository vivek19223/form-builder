import React from 'react';

const InputText = props => {
  return (
    <div className="ui fluid labeled input">
      <div className="ui label">
        {props.label}
      </div>
      <input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <br />
    </div>
  );
};

export default InputText;
