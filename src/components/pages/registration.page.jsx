import { Redirect } from "react-router";
import { isAuth } from "../../helpers/auth";
import { getRegisterContent } from "../../helpers/content-api";
import RegistrationSection from "../sections/registration.section";

const RegistrationPage = (props) => {
  if (isAuth()) return <Redirect to={props.urlPathContent.homePage} />;
  else
    return (
      <RegistrationSection
        userRole={"student"}
        registerContent={getRegisterContent(props.language)}
      />
    );
};

export default RegistrationPage;
