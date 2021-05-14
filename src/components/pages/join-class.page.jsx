import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

import JoinClassSection from "../sections/join-class.section";
import { useEffect } from "react";
import { getJoinClassContent } from "../../helpers/content-api";

const JoinClassPage = (props) => {
  useEffect(() => {
    props.setselectedPage("joinClassPage");
  }, [props]);
  if (
    isAuth() &&
    props.hasPageAccess("joinClassPage", isAuth().role, props.language)
  )
    return (
      <JoinClassSection
        joinClassContent={getJoinClassContent(props.language)}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default JoinClassPage;
