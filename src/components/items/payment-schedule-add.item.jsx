import DatePicker from "react-datepicker";

const PaymentScheduleAddItem = (props) => {
  return (
    <li>
      {" "}
      <form
        onSubmit={(formProps) => {
          props.handleAddNewShedule(formProps);
        }}
      >
        <div className="all-details">
          <div className="primary-details ">
            <div className="list-form-group input-group">
              <label htmlFor="requestAmount">
                {props.paymentContent.requestAmountContent}({props.currency}):
              </label>
              <input
                type="text"
                className="money-amount"
                id="requestAmount"
                placeholder={props.paymentContent.requestAmountContent}
                onChange={props.handleScheduleFormAmountChange("requestAmount")}
                onBlur={props.handleScheduleFormAmountBlur("requestAmount")}
                value={props.scheduleFormData.requestAmount}
              />
            </div>
          </div>
          <div className="secondary-details">
            <div className="date-body">
              <div className="list-form-group">
                <label htmlFor="warningDate">
                  {props.paymentContent.warningDateContent}:
                </label>
                <DatePicker
                  // dateFormat="dd/MM//yyyy"
                  selected={props.scheduleFormData.warningDate}
                  onChange={(date) =>
                    props.handleScheduleFormDateChange("warningDate", date)
                  }
                  placeholderText={props.paymentContent.selectDateContent}
                  className="form-control "
                  id="warningDate"
                />
              </div>{" "}
              <div className="list-form-group">
                <label htmlFor="lastDate">
                  {props.paymentContent.lastDateContent}:
                </label>
                <DatePicker
                  // dateFormat="dd/MM//yyyy"
                  selected={props.scheduleFormData.lastDate}
                  onChange={(date) =>
                    props.handleScheduleFormDateChange("lastDate", date)
                  }
                  placeholderText={props.paymentContent.selectDateContent}
                  className="form-control "
                  id="lastDate"
                />
              </div>
            </div>
            <div className="comment-body">
              <input
                type="text"
                className=""
                placeholder={props.paymentContent.commentContent}
                onChange={props.handleScheduleFormChange("comment")}
                value={props.scheduleFormData.comment}
                id="comment"
              />
            </div>
          </div>
          <div className="container third-details">
            <button type="submit" className="btn primary-button">
              {props.paymentContent.addScheduleContent}
            </button>
          </div>
        </div>
      </form>
    </li>
  );
};

export default PaymentScheduleAddItem;
