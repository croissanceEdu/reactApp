import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

import StudentHomeSection from "../sections/student-home.section";
import { useEffect } from "react";

const HomePage = (props) => {
  useEffect(() => {
    props.setselectedPage("homePage");
  }, [props]);
  if (isAuth()) return <StudentHomeSection />;
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default HomePage;
