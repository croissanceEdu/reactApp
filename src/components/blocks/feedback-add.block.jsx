const FeedbackAddBlock = (props) => {
  //handle input changes
  const handleChange = (text) => (e) => {
    props.setFormData({ ...props.formData, [text]: e.target.value });
  };

  return (
    <form
      id="form-new-feedback"
      className="container"
      onSubmit={(formProps) => {
        props.handleSubmit(formProps);
      }}
    >
      <div className="form-group row  p-2 m-2">
        <div className="container">
          <input
            type="text"
            required
            className="form-control"
            name="titleName"
            id="titleName"
            placeholder={props.feedbackContent.titleContent}
            required
            onChange={handleChange("title")}
            value={props.formData.title}
          />
        </div>
      </div>
      <div className="form-group  p-2 m-2">
        <textarea
          placeholder={props.feedbackContent.MessageContent}
          className="form-control container"
          name="messageContent"
          id="messageContent"
          rows="3"
          required
          onChange={handleChange("content")}
          value={props.formData.content}
        ></textarea>
      </div>

      <div className="form-group row button-submit-div">
        <div className="offset-sm-2 ">
          <button type="submit" className="btn primary-button ">
            {props.feedbackContent.sendFeedbackContent}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackAddBlock;
