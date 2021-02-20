import React from "react";
import "./FormInput.scss";

function FormInput({ handleChange, label, ...rest }) {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...rest} />
      {label ? (
        <label
          className={`${rest.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      ) : null}
      {/* this line of codes mean that if value for the input is provided the class name 'shrink' and form-input-label will be applied. 
        However if no label is provided there will be no label. 
        */}
    </div>
  );
}

export default FormInput;
