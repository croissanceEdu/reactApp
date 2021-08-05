const PaymentScheduleTab = (props) => {
  return (
    <div className="tab-window">
      {props.bindFeeDetails()}
      <ul>
        {props.bindSchedule()}
        {props.userDetails
          ? props.userDetails.role === "admin" && props.bindScheduleAdd()
          : null}
      </ul>
    </div>
  );
};

export default PaymentScheduleTab;
