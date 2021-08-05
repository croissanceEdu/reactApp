const PaymentHistoryTab = (props) => {
  return (
    <div className="tab-window">
      {props.bindFeeDetails()}
      <ul>{props.bindHistory()}</ul>
    </div>
  );
};

export default PaymentHistoryTab;
