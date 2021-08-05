const PopupContainerExtra = (props) => {
  return (
    <div
      className={props.popupContainerClassNames}
      id="popup-container"
      onClick={props.popupFunctions.closePopup}
    ></div>
  );
};

export default PopupContainerExtra;
