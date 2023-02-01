import React from "react";

import "./Loader.css";

const Loader = (props) => {
  return (
    <div className={`${props.asOverlay && "loader-wrapper"}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
