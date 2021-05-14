import { useEffect } from "react";
import { Redirect } from "react-router";
import { isAuth } from "../../helpers/auth";
import { getProfileContent } from "../../helpers/content-api";
import ProfileSection from "../sections/profile.section";

const ProfilePage = (props) => {
  useEffect(() => {
    props.setselectedPage("profilePage");
  }, [props]);
  if (isAuth())
    return (
      <ProfileSection profileContent={getProfileContent(props.language)} />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ProfilePage;
