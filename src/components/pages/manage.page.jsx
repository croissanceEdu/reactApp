import { useEffect } from "react";
import { Redirect } from "react-router";
import { getManageContent } from "../../helpers/content-api";
import ManageSection from "../sections/manage.section";

const ManagePage = (props) => {
  useEffect(() => {
    props.setselectedPage("managePage");
  }, [props]);
  if (
    props.userDetails &&
    props.hasPageAccess("managePage", props.userDetails.role, props.language)
  )
    return (
      <ManageSection
        manageContent={getManageContent(props.language)}
        popupFunctions={props.popupFunctions}
        onlineUsers={props.onlineUsers}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ManagePage;
