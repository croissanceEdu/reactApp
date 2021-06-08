import { Redirect } from "react-router-dom";

import JoinClassSection from "../sections/join-class.section";
import { useEffect } from "react";
import { getJoinClassContent } from "../../helpers/content-api";

const JoinClassPage = (props) => {
  useEffect(() => {
    props.setselectedPage("joinClassPage");
  }, [props]);
  if (
    props.userDetails &&
    props.hasPageAccess("joinClassPage", props.userDetails.role, props.language)
  )
    return (
      <JoinClassSection
        joinClassContent={getJoinClassContent(props.language)}
        userDetails={props.userDetails}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default JoinClassPage;
