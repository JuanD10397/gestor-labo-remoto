import React from "react";

import "./InputText.scss";

export default function InputText(props) {
  const { title } = props;
  return (
    <div className="input-group mb-3 divGa">
      <span className="input-group-text" id="basic-addon1">
        {title}
      </span>
      <input
        type="text"
        className="inputText form-control"
        placeholder={title}
        aria-label={title}
        aria-describedby="basic-addon1"
      />
    </div>
  );
}
