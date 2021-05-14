import { Redirect } from "react-router";
import { isAuth } from "../../helpers/auth";
import { getRegisterContent } from "../../helpers/content-api";
import RegistrationSection from "../sections/registration.section";

const RegisterTeacherPage = (props) => {
  if (isAuth()) return <Redirect to={props.urlPathContent.homePage} />;
  else
    return (
      <RegistrationSection
        userRole={"teacher"}
        registerContent={getRegisterContent(props.language)}
      />
    );
};

export default RegisterTeacherPage;
