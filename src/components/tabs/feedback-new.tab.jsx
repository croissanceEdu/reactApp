import FeedbackAddBlock from "../blocks/feedback-add.block";

const FeedbackNewTab = (props) => {
  return <FeedbackAddBlock handleSubmit={props.handleSubmit} />;
};

export default FeedbackNewTab;
