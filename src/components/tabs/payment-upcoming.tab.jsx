const PaymentUpcomingTab = (props) => {
  return (
    <div className="tab-window">
      {props.bindFeeDetails()}
      <ul>{props.bindUpcoming()}</ul>
    </div>
  );
};

export default PaymentUpcomingTab;
