import React from "react";
import { Link } from "react-router-dom";

import "./HomeButton.scss";

export default function HomeButton(props) {
  const { route } = props;

  return (
    <Link to={route} className="link">
      <div className="home-button">{props.children}</div>
    </Link>
  );
}
