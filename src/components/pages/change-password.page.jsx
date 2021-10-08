import { useEffect } from "react";
import { Redirect } from "react-router";
import { getChangePasswordContent } from "../../helpers/content-api";
import ChangePasswordSection from "../sections/change-password.section";

const ChangePasswordPage = (props) => {
  useEffect(() => {
    props.setselectedPage("changePasswordPage");
  }, [props]);
  if (props.userDetails)
    return (
      <ChangePasswordSection
        userDetails={props.userDetails}
        changePasswordContent={getChangePasswordContent(props.language)}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ChangePasswordPage;
