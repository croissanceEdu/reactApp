import ProfilePictureBlock from "../blocks/profile-picture.block";

const ProfilePictureTab = (props) => {
  console.log(props.profilePicture);
  return (
    <div className="tab-window">
      <ProfilePictureBlock
        profileContent={props.profileContent}
        profilePicture={props.profilePicture}
        setProfilePicture={props.setProfilePicture}
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
      />
    </div>
  );
};

export default ProfilePictureTab;
