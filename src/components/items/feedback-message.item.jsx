import { getFormattedDate } from "../../helpers/custom";

const FeedbackMessageItem = (props) => {
  return (
    <li className={props.isSender ? "bg-warning text-right" : "bg-secondary"}>
      <h3>{props.feedback.titleName}</h3>
      <p>{props.feedback.messageContent}</p>
      <small className="mb-2 text-right ">
        {getFormattedDate(props.feedback.createdAt)}
      </small>
      {props.isSender ? (
        <small>
          {props.feedback.isDeliverStatus ? (
            props.feedback.isReadStatus ? (
              <>
                <span className="badge badge-success badge-pill ">R</span>
                {/* <span>{getFormattedDate(props.feedback.updatedAt)}</span> */}
              </>
            ) : (
              <span className="badge badge-secondary badge-pill">D</span>
            )
          ) : (
            <span className="badge badge-light badge-pill ">S</span>
          )}
        </small>
      ) : (
        <small>
          {!props.feedback.isReadStatus ? (
            <span className="badge badge-warning badge-pill">New</span>
          ) : null}
        </small>
      )}
    </li>
  );
};

export default FeedbackMessageItem;
