import AvatarMenuSegment from "./avatar-menu.segment";

const ProfileAvatarSegment = (props) => {
  return (
    <div className="avatar-container">
      <div className="avatar">
        <div
          className="avatar-img"
          style={{
            backgroundImage: "url(" + props.profilePicture + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <AvatarMenuSegment
        profileContent={props.profileContent}
        handleCropper={props.handleCropper}
        handleRemoveImage={props.handleRemoveImage}
        setProfilePicture={props.setProfilePicture}
        profilePicture={props.profilePicture}
      />
    </div>
  );
};

export default ProfileAvatarSegment;
