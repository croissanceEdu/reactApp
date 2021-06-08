import { useState } from "react";
import ProfileBasicBlock from "../blocks/profile-basic.block";
import ProfilePictureBlock from "../blocks/profile-picture.block";
import TabSelectorBlock from "../blocks/tab-selector.block";
import ProfileBasicTab from "../tabs/profile-basic.tab";
import ProfilePictureTab from "../tabs/profile-picture.tab";

const ProfileSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("profilePictureTab");

  const bindTabWindow = () => {
    switch (selectedTab) {
      case "profilePictureTab":
        return (
          <ProfilePictureTab
            profileContent={props.profileContent}
            profilePicture={props.profilePicture}
            setProfilePicture={props.setProfilePicture}
            userDetails={props.userDetails}
            setUserDetails={props.setUserDetails}
          />
        );
      case "basicProfileTab":
        return (
          <ProfileBasicTab
            profileContent={props.profileContent}
            profilePicture={props.profilePicture}
            setProfilePicture={props.setProfilePicture}
            userDetails={props.userDetails}
            setUserDetails={props.setUserDetails}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="profile-section ">
      <div className="navbar-spacer"></div>
      <div className="container container-element">
        <div className="tab-section">
          <TabSelectorBlock
            tabWindows={props.profileContent.tabWindows}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isAvailable={true}
            unAvailableMessage="not available"
          />
          {bindTabWindow()}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
