import { Redirect } from "react-router-dom";

import FeedbackSection from "../sections/feedback.section";
import { getFeedbackContent } from "../../helpers/content-api";
import { useEffect } from "react";

const FeedbackPage = (props) => {
  useEffect(() => {
    props.setselectedPage("feedbackPage");
  }, [props]);
  if (
    props.userDetails &&
    props.hasPageAccess("feedbackPage", props.userDetails.role, props.language)
  )
    return (
      <FeedbackSection
        feedbackContent={getFeedbackContent(props.language)}
        notifications={props.notifications}
        notify={props.notify}
        userDetails={props.userDetails}
        onlineUsers={props.onlineUsers}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default FeedbackPage;
