import { useState } from "react";

const ScreenOverlayExtra = (props) => {
  return (
    <div
      id="screen-overlay"
      className={props.overlayClassNames}
      onClick={() => {
        props.setNavVisible(false);
      }}
    ></div>
  );
};

export default ScreenOverlayExtra;
