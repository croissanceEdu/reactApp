import AvatarMenuSegment from "./avatar-menu.segment";

const ProfileAvatarSegment = (props) => {
  return (
    <div className="avatar-container">
      <div className="avatar">
        <img src="" alt="avatar" className="avatar-img" />
      </div>
      <AvatarMenuSegment
        profileContent={props.profileContent}
        handleCropper={props.handleCropper}
      />
    </div>
  );
};

export default ProfileAvatarSegment;
