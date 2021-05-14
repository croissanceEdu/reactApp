const FeedbackHistoryTab = (props) => {
  return (
    <div>
      <ul>{props.bindHistory()}</ul>
    </div>
  );
};

export default FeedbackHistoryTab;
