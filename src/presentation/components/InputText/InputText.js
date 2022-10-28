import React from "react";

import "./InputText.scss";

export default function InputText(props) {
  const { title } = props;
  return (
    <div class="input-group mb-3 divGa">
      <span class="input-group-text" id="basic-addon1">
        {title}
      </span>
      <input
        type="text"
        class="form-control"
        placeholder={title}
        aria-label={title}
        aria-describedby="basic-addon1"
        className="inputText"
      />
    </div>
  );
}
