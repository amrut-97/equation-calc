import React from "react";

import "../styles/Main.modules.css";

const VarBoxItem = ({ draggable, dragStart, item, index, removeBoxItem }) => {
  return (
    <div
      draggable={draggable}
      id="var"
      className="box-item style-var"
      onDragStart={(e) => dragStart(e, index)}
    >
      <span className="box-value">{item.name}</span>
      <span
        className="box-close"
        onClick={() => removeBoxItem(index)}
      ></span>
    </div>
  );
};

export default VarBoxItem;
