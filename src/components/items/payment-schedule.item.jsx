import { getFormattedDate, customContent } from "../../helpers/custom";

const PaymentScheduleItem = (props) => {
  return (
    <li className="">
      <div className="all-details">
        <div className="primary-details ">
          <div className=" list-form-group">
            <p>{props.paymentContent.requestAmountContent}:</p>
            <h3>
              {props.formatMoney(props.payment.requestAmount, props.currency)}
            </h3>
          </div>
        </div>
        <div className="secondary-details">
          <div className="date-body">
            {" "}
            <div className=" list-form-group">
              <p>{props.paymentContent.warningDateContent}:</p>
              <h4>
                {getFormattedDate(
                  props.payment.warningDate,
                  customContent.timeFormats.payment
                )}
              </h4>
            </div>{" "}
            <div className=" list-form-group">
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
        {props.userDetails
          ? props.userDetails.role === "admin" && (
              <div className="third-details">
                <button
                  className="btn delete-button"
                  disabled={props.payment.isPaid || props.payment.isRequested}
                  onClick={() => {
                    props.deleteSchedule(props.payment._id);
                  }}
                >
                  {props.paymentContent.deleteScheduleContent}
                </button>
              </div>
            )
          : null}
      </div>
    </li>
  );
};

export default PaymentScheduleItem;
