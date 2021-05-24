const FeedbackHistoryTab = (props) => {
  return (
    <div className="tab-window">
      <ul>{props.bindHistory()}</ul>
    </div>
  );
};

export default FeedbackHistoryTab;
