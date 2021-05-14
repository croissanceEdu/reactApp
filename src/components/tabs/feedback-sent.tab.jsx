const FeedbackSentTab = (props) => {
  return (
    <div>
      <ul>{props.bindSent()}</ul>
    </div>
  );
};

export default FeedbackSentTab;
