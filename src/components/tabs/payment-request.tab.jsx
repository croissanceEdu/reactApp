const PaymentRequestTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindRequests()}</ul>
    </div>
  );
};

export default PaymentRequestTab;
