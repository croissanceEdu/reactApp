import { getFormattedDate, customContent } from "../../helpers/custom";

const PaymentHistoryItem = (props) => {
  return (
    <li>
      <div className="all-details">
        <div className="primary-details ">
          <div className="list-form-group">
            {/* <p>{props.paymentContent.paidAmountContent}:</p> */}
            <h3 className="money-amount">
              {props.formatMoney(
                props.payment.paidAmount,
                props.payment.currency
              )}
            </h3>
          </div>
        </div>
        <div className="secondary-details">
          {/* <div className="comment-body">
            <p>{props.payment.comment}</p>
          </div> */}
        </div>
        <div className="third-details">
          {/* <div className="list-form-group">
            <p>{props.paymentContent.paymentMethodContent}:</p>
            <h4>{props.payment.paymentMethod}</h4>
          </div> */}
          <div className="date-body">
            <div className="list-form-group">
              {/* <p>{props.paymentContent.paidDateContent}:</p> */}
              <h4>
                {getFormattedDate(
                  props.payment.createdAt,
                  customContent.timeFormats.paymentHistory
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PaymentHistoryItem;
