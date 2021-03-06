import FeedbackAddBlock from "../blocks/feedback-add.block";

const FeedbackNewTab = (props) => {
  return (
    <div className="tab-window">
      <FeedbackAddBlock
        handleSubmit={props.handleSubmit}
        formData={props.formData}
        setFormData={props.setFormData}
        feedbackContent={props.feedbackContent}
      />
    </div>
  );
};

export default FeedbackNewTab;
