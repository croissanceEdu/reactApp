import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RecordPaymentPopup = (props) => {
  // const [comment, setComment] = useState("");
  // const handleOnChangeComment = (e) => {
  //   props.popupFunctions.setPopupData({
  //     comment: e.target.value,
  //   });
  // };
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
        {/* <textarea
          placeholder="Comment"
          onChange={handleOnChangeComment}
          value={props.popupDetails.popupData.comment}
        ></textarea> */}
        <div className="popup-buttons">{bindButtons()}</div>
      </div>
    </div>
  );
};

export default RecordPaymentPopup;
