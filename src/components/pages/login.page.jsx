import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import LoginSection from "../sections/login.section";

const LoginPage = (props) => {
  if (isAuth()) return <Redirect to={props.urlPathContent.homePage} />;
  else return <LoginSection />;
};

export default LoginPage;
