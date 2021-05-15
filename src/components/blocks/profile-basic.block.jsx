import { useState } from "react";

import CropperSegment from "../segments/cropper.segment";
import ProfileAvatarSegment from "../segments/profile-avatar.segment";

const ProfileBasicBlock = (props) => {
  const [showCropper, setShowCropper] = useState(false);
  const handleCropper = () => {
    setShowCropper((prev) => !prev);
  };

  return (
    <div>
      {!showCropper ? (
        <ProfileAvatarSegment
          profileContent={props.profileContent}
          handleCropper={handleCropper}
          profilePicture={props.profilePicture}
        />
      ) : (
        <CropperSegment
          profileContent={props.profileContent}
          handleCropper={handleCropper}
          setProfilePicture={props.setProfilePicture}
        />
      )}
    </div>
  );
};

export default ProfileBasicBlock;
