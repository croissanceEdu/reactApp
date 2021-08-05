const PaymentPendingTab = (props) => {
  return (
    <div className="tab-window">
      {props.bindFeeDetails()}
      <ul>{props.bindPending()}</ul>
    </div>
  );
};

export default PaymentPendingTab;
