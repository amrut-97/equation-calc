import React from "react";

import "../styles/Main.modules.css";

const OpBoxItem = ({ draggable, dragStart, item, index, removeBoxItem }) => {
  return (
    <div
      draggable={draggable}
      id={item.type}
      onDragStart={(e) => {
        dragStart(e, index);
      }}
      className="box-item style-ops"
    >
      <span className="box-value">{item.value}</span>
      <span
        className="box-close"
        onClick={() => removeBoxItem(index)}
      ></span>
    </div>
  );
};

export default OpBoxItem;
