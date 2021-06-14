const PaymentUpcomingTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindUpcoming()}</ul>
    </div>
  );
};

export default PaymentUpcomingTab;
