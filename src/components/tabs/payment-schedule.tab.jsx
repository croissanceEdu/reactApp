const PaymentScheduleTab = (props) => {
  return (
    <div className="tab-window">
      <ul>
        {props.bindSchedule()}
        {props.bindScheduleAdd()}
      </ul>
    </div>
  );
};

export default PaymentScheduleTab;
