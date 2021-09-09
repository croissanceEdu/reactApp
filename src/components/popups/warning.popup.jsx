import { v4 as uuidv4 } from "uuid";

const WarningPopup = (props) => {
  const bindButtons = () => {
    return props.popupDetails.buttons.map((item) => {
      const handleButtonClick = (itm) => {
        if (itm.onClickFunction) {
          itm.onClickFunction(item.onClickArgument);
        }
        if (itm.closeAfter) props.popupFunctions.closePopup();
      };
      if (item.content === "RazorPay")
        return (
          <form>
            <script
              src="https://checkout.razorpay.com/v1/payment-button.js"
              data-payment_button_id="pl_Hr2skT2d9jMAaW"
              async
            >
              {" "}
            </script>{" "}
          </form>
        );
      else
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
      <div
        onCli
        onClick={props.popupFunctions.closePopup}
        className="dummy-div"
      ></div>
      <div className={`popup-container ${props.popupDetails.className}`}>
        <h3>{props.popupDetails.title}</h3>
        <p>{props.popupDetails.content}</p>
        <div className="popup-buttons">{bindButtons()}</div>
      </div>
      <div
        onClick={props.popupFunctions.closePopup}
        className="dummy-div"
      ></div>
    </div>
  );
};

export default WarningPopup;
