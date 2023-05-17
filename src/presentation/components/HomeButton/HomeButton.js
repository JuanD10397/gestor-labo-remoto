import React from "react";
import { Link } from "react-router-dom";

import "./HomeButton.scss";

export default function HomeButton(props) {
  const { route, imgClass } = props;

  return (
    <Link to={route} className="link">
      <div className={"home-button" + " " + imgClass}>{props.children}</div>
    </Link>
  );
}
