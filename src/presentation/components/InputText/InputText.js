import React from "react";

import "./InputText.scss";

export default function InputText(props) {
  const { type, title, placeholder, name, value, onChange } = props;
  return (
    <div className="input-group mb-3 divGa">
      <span className="input-group-text width-10" id="basic-addon1">
        {title}
      </span>
      <input
        type={type}
        className="inputText form-control"
        placeholder={placeholder ? placeholder : title}
        aria-label={title}
        aria-describedby="basic-addon1"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
