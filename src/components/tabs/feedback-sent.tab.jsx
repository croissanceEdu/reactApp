const FeedbackSentTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindSent()}</ul>
    </div>
  );
};

export default FeedbackSentTab;
