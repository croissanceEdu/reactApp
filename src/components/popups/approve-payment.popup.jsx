import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ApprovePaymentPopup = (props) => {
  const bindButtons = () => {
    return props.popupDetails.buttons.map((item) => {
      const handleButtonClick = (itm) => {
        if (itm.onClickFunction) {
          itm.onClickFunction(item.onClickArgument);
        }
        if (itm.closeAfter) props.popupFunctions.closePopup();
      };
      return (
        <button
          key={uuidv4()}
          className={item.className}
          onClick={() => handleButtonClick(item)}
        >
          {item.content}
        </button>
      );
    });
  };
  return (
    <div className={`popup-window ${props.popupContainerClassNames}`}>
      <div className={`popup-container ${props.popupDetails.className}`}>
        <h3>{props.popupDetails.title}</h3>
        <p>{props.popupDetails.content}</p>
        <div className="popup-buttons">{bindButtons()}</div>
      </div>
    </div>
  );
};

export default ApprovePaymentPopup;
