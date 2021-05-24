import { getFormattedDate } from "../../helpers/custom";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";

const FeedbackMessageItem = (props) => {
  return (
    <li className={props.isSender ? "sent-feedbacks" : "received-feedbacks"}>
      <h3>{props.feedback.titleName}</h3>
      <p>{props.feedback.messageContent}</p>
      <div>
        <small className="mb-2 text-right ">
          {getFormattedDate(props.feedback.createdAt)}
        </small>
        {props.isSender ? (
          <small>
            {props.feedback.isDeliverStatus ? (
              props.feedback.isReadStatus ? (
                <>
                  {/* <span className="badge badge-success badge-pill ">R</span> */}
                  <DoneAllIcon style={{ color: "turquoise" }} />
                  {/* <span>{getFormattedDate(props.feedback.updatedAt)}</span> */}
                </>
              ) : (
                // <span className="badge badge-secondary badge-pill">D</span>
                <DoneAllIcon style={{ color: "lightgray" }} />
              )
            ) : (
              <DoneIcon style={{ color: "lightgray" }} />
              // <span className="badge badge-light badge-pill ">S</span>
            )}
          </small>
        ) : (
          <small>
            {!props.feedback.isReadStatus ? (
              <span className="badge badge-warning badge-pill">New</span>
            ) : null}
          </small>
        )}
      </div>
    </li>
  );
};

export default FeedbackMessageItem;
