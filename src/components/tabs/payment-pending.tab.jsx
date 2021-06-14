const PaymentPendingTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindPending()}</ul>
    </div>
  );
};

export default PaymentPendingTab;
