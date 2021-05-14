import { useEffect } from "react";
import { Redirect } from "react-router";
import { isAuth } from "../../helpers/auth";
import { getManageContent } from "../../helpers/content-api";
import ManageSection from "../sections/manage.section";

const ManagePage = (props) => {
  useEffect(() => {
    props.setselectedPage("managePage");
  }, [props]);
  if (
    isAuth() &&
    props.hasPageAccess("managePage", isAuth().role, props.language)
  )
    return <ManageSection manageContent={getManageContent(props.language)} />;
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ManagePage;
