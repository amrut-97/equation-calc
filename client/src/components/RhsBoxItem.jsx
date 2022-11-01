import React from "react";

import "../styles/Main.modules.css";

const RhsBoxItem = ({ item, index, removeBoxItem }) => {
  return (
    <div id="rhs" className="box-item style-rhs" key={index}>
      <span className="box-value">{item.value}</span>
      <span className="box-close" onClick={() => removeBoxItem(index)}></span>
    </div>
  );
};

export default RhsBoxItem;
