import { getFormattedDate, customContent } from "../../helpers/custom";
import RazorPayPopup from "../popups/razor-pay.popup";

const PaymentPendingItem = (props) => {
  return (
    <li>
      {" "}
      <div className="all-details">
        <div className="primary-details ">
          <div className="list-form-group">
            <p>{props.paymentContent.requestAmountContent}:</p>
            <h3>
              {props.formatMoney(props.payment.requestAmount, props.currency)}
            </h3>
          </div>
        </div>
        <div className="secondary-details">
          <div className="date-body">
            {" "}
            <div className="list-form-group">
              <p>{props.paymentContent.warningDateContent}:</p>
              <h4>
                {getFormattedDate(
                  props.payment.warningDate,
                  customContent.timeFormats.payment
                )}
              </h4>
            </div>{" "}
            <div className="list-form-group">
              <p>{props.paymentContent.lastDateContent}:</p>
              <h4>
                {getFormattedDate(
                  props.payment.lastDate,
                  customContent.timeFormats.payment
                )}
              </h4>
            </div>
          </div>
          <div className="comment-body">
            <p>{props.payment.comment}</p>
          </div>
        </div>
        {props.payment.isRequested ? (
          <div className="third-details">
            <p>Requested</p>
          </div>
        ) : (
          <div className="third-details">
            {/* {props.userDetails.role === "admin" && (

              <button
                className="btn edit-button"
                disabled={props.payment.isPaid}
                onClick={() => {
                  props.recordPaymentPopupOpen(props.payment);
                }}
                disabled
              >
                {props.paymentContent.recordPaymentContent}
              </button>
            )} */}
            {props.userDetails.role === "teacher" && (
              <button
                className="btn primary-button"
                disabled={props.payment.isPaid || props.payment.isRequested}
                onClick={() => {
                  props.handlePayButtonClick(props.payment);
                }}
              >
                {props.paymentContent.addPaymentRecordContent}
              </button>
            )}
            {props.userDetails.role === "student" && (
              <RazorPayPopup
                paymentContent={props.paymentContent}
                paymentSchedule={props.payment}
                razorpayPaymentSucess={props.razorpayPaymentSucess}
              />
            )}
            {/* {props.userDetails.role === "student" && (
              <form>
                <script
                  src="https://checkout.razorpay.com/v1/payment-button.js"
                  data-payment_button_id="pl_Hr2skT2d9jMAaW"
                >
                  async >{" "}
                </script>{" "}
              </form>
            )} */}
          </div>
        )}
      </div>
    </li>
  );
};

export default PaymentPendingItem;
