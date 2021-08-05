import { Redirect } from "react-router-dom";
import SyllabusSection from "../sections/syllabus.section";
import { getSyllabusContent } from "../../helpers/content-api";
import { useEffect } from "react";

const SyllabusPage = (props) => {
  useEffect(() => {
    props.setselectedPage("syllabusPage");
  }, [props]);
  if (
    props.userDetails &&
    props.hasPageAccess("syllabusPage", props.userDetails.role, props.language)
  )
    return (
      <SyllabusSection
        syllabusContent={getSyllabusContent(props.language)}
        notifications={props.notifications}
        notify={props.notify}
        userDetails={props.userDetails}
        popupFunctions={props.popupFunctions}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default SyllabusPage;
