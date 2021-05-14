import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

import SyllabusSection from "../sections/syllabus.section";
import { getSyllabusContent } from "../../helpers/content-api";
import { useEffect } from "react";

const SyllabusPage = (props) => {
  useEffect(() => {
    props.setselectedPage("syllabusPage");
  }, [props]);
  if (isAuth())
    return (
      <SyllabusSection syllabusContent={getSyllabusContent(props.language)} />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default SyllabusPage;
