import { isAuth } from "../../helpers/auth";
import AvatarMenuSegment from "./avatar-menu.segment";

const ProfileAvatarSegment = (props) => {
  return (
    <div className="avatar-container">
      <div className="avatar">
        <img src={props.profilePicture} alt="avatar" className="avatar-img" />
      </div>
      <AvatarMenuSegment
        profileContent={props.profileContent}
        handleCropper={props.handleCropper}
      />
    </div>
  );
};

export default ProfileAvatarSegment;
