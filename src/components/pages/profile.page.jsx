import { useEffect } from "react";
import { Redirect } from "react-router";
import { getProfileContent } from "../../helpers/content-api";
import ProfileSection from "../sections/profile.section";

const ProfilePage = (props) => {
  useEffect(() => {
    props.setselectedPage("profilePage");
  }, [props]);
  if (props.userDetails)
    return (
      <ProfileSection
        profileContent={getProfileContent(props.language)}
        profilePicture={props.profilePicture}
        setProfilePicture={props.setProfilePicture}
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default ProfilePage;
