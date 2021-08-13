import { Redirect } from "react-router";
import { getRegisterContent } from "../../helpers/content-api";
import RegistrationSection from "../sections/registration.section";

const RegisterTeacherPage = (props) => {
  if (props.userDetails) return <Redirect to={props.urlPathContent.homePage} />;
  else
    return (
      <RegistrationSection
        userRole={"teacher"}
        registerContent={getRegisterContent(props.language)}
      />
    );
};

export default RegisterTeacherPage;
