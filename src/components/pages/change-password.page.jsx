import { useEffect } from "react";
import { Redirect } from "react-router";
import { isAuth } from "../../helpers/auth";
import ChangePasswordSection from "../sections/change-password.section";

const ChangePasswordPage = (props) => {
  useEffect(() => {
    props.setselectedPage("changePasswordPage");
  }, [props]);
  if (isAuth()) return <ChangePasswordSection />;
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ChangePasswordPage;
