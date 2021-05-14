const FeedbackReceivedTab = (props) => {
  return (
    <div>
      <ul>{props.bindReceived()}</ul>
    </div>
  );
};

export default FeedbackReceivedTab;
