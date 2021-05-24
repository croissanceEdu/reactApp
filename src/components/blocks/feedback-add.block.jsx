const FeedbackAddBlock = (props) => {
  //handle input changes
  const handleChange = (text) => (e) => {
    props.setFormData({ ...props.formData, [text]: e.target.value });
  };

  return (
    <form
      onSubmit={(formProps) => {
        props.handleSubmit(formProps);
      }}
    >
      <div className="form-group row">
        <div className="col-sm-12 pt-4">
          <input
            type="text"
            required
            className="form-control"
            name="titleName"
            id="titleName"
            placeholder="Title"
            required
            onChange={handleChange("title")}
            value={props.formData.title}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Message"
          className="form-control"
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
          <button type="submit" className="btn btn-primary ">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackAddBlock;
