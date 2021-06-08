import { Redirect } from "react-router-dom";
import SyllabusSection from "../sections/syllabus.section";
import { getSyllabusContent } from "../../helpers/content-api";
import { useEffect } from "react";

const SyllabusPage = (props) => {
  useEffect(() => {
    props.setselectedPage("syllabusPage");
  }, [props]);
  if (props.userDetails)
    return (
      <SyllabusSection
        syllabusContent={getSyllabusContent(props.language)}
        notifications={props.notifications}
        notify={props.notify}
        userDetails={props.userDetails}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default SyllabusPage;
