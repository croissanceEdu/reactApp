const PaymentRequestTab = (props) => {
  return (
    <div className="tab-window">
      {props.bindFeeDetails()}
      <ul>{props.bindRequests()}</ul>
    </div>
  );
};

export default PaymentRequestTab;
