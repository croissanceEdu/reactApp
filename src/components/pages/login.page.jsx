import { Redirect } from "react-router-dom";
import { getLoginContent } from "../../helpers/content-api";
import LoginSection from "../sections/login.section";

const LoginPage = (props) => {
  if (props.userDetails) return <Redirect to={props.urlPathContent.homePage} />;
  else
    return (
      <LoginSection
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
        loginContent={getLoginContent(props.language)}
      />
    );
};

export default LoginPage;
