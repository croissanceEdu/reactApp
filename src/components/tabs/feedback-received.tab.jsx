const FeedbackReceivedTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindReceived()}</ul>
    </div>
  );
};

export default FeedbackReceivedTab;
