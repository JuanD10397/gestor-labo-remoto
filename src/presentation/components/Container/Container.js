import React from "react";

import "./Container.scss";

// import styled from "styled-components";

// export const Div = styled.div`
//   background: blue;
//   width: 80%;
//   height: 500px;
//   margin: 0 10% 0 10%;

//   border: 2px solid;
//   border-color: red;
//   border-radius: 30px;
// `;

export default function Container(props) {
  return <div className="containerDef">{props.children}</div>;
}
