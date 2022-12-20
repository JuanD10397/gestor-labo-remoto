import React from "react";

import "./TextArea.scss";

export default function TextArea(props) {
  const { title, name, value, onChange } = props;
  return (
    <div className="input-group mb-3 divGa">
      <span className="input-group-text" id="basic-addon1">
        {title}
      </span>
      <textarea
        className="inputText form-control"
        placeholder={title}
        aria-label={title}
        aria-describedby="basic-addon1"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
