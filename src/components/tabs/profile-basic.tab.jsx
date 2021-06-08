import ProfileBasicBlock from "../blocks/profile-basic.block";

const ProfileBasicTab = (props) => {
  return (
    <div className="tab-window">
      <ProfileBasicBlock
        profileContent={props.profileContent}
        profilePicture={props.profilePicture}
        setProfilePicture={props.setProfilePicture}
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
      />
    </div>
  );
};

export default ProfileBasicTab;
