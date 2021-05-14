const FeedbackAddBlock = (props) => {
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
        ></textarea>
      </div>

      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10 right-align">
          <button type="submit" className="btn btn-primary float-right">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackAddBlock;
