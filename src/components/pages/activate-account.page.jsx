import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

import ActivateAccountSection from "../sections/activate-account.section";
import ActivateByLinkSection from "../sections/activate-by-link.section";
import { useEffect } from "react";

const ActivateAccountPage = (props) => {
  useEffect(() => {
    props.setselectedPage("activateAccountPage");
  }, [props]);
  if (props.userDetails) {
    if (
      props.hasPageAccess(
        "activateAccountPage",
        props.userDetails.role,
        props.language
      )
    )
      return <ActivateAccountSection userDetails={props.userDetails} />;
    else return <Redirect to={props.urlPathContent.homePage} />;
  } else return <ActivateByLinkSection />;
};

export default ActivateAccountPage;
