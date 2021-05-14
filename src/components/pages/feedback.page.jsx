import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

import FeedbackSection from "../sections/feedback.section";
import { getFeedbackContent } from "../../helpers/content-api";
import { useEffect } from "react";

const FeedbackPage = (props) => {
  useEffect(() => {
    props.setselectedPage("feedbackPage");
  }, [props]);
  if (
    isAuth() &&
    props.hasPageAccess("feedbackPage", isAuth().role, props.language)
  )
    return (
      <FeedbackSection feedbackContent={getFeedbackContent(props.language)} />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default FeedbackPage;
