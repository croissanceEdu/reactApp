import { Redirect } from "react-router-dom";
import LoginSection from "../sections/login.section";

const LoginPage = (props) => {
  if (props.userDetails) return <Redirect to={props.urlPathContent.homePage} />;
  else
    return (
      <LoginSection
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
      />
    );
};

export default LoginPage;
