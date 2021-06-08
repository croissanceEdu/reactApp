import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import CropperSegment from "../segments/cropper.segment";
import ProfileAvatarSegment from "../segments/profile-avatar.segment";

const ProfilePictureBlock = (props) => {
  const [showCropper, setShowCropper] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: props.userDetails.name,
    email: props.userDetails.email,
    dateOfBirth: new Date(),
    contactNumber: "",
    fullAddress: "",
    gender: "",
    qualification: "",
  });
  useEffect(() => {
    LoadDetails();
    setEditMode(false);
  }, []);
  const handleCropper = () => {
    setShowCropper((prev) => !prev);
  };
  const LoadDetails = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getdetails`, {
        id: props.userDetails._id,
      })
      .then((res) => {
        // props.setProfilePicture(
        //   res.data.user.imagePath
        //     ? `${process.env.REACT_APP_SERVER_URL}/${res.data.user.imagePath}`
        //     : ""
        // );
        if (res.data.userProfile)
          setFormData({
            ...formData,
            dateOfBirth: new Date(res.data.userProfile.dateOfBirth),
            contactNumber: res.data.userProfile.contactNumber,
            fullAddress: res.data.userProfile.fullAddress,
            gender: res.data.userProfile.gender,
            qualification: res.data.userProfile.qualification,
          });
      })
      .catch((err) => {
        if (err.response) toast.error(err.response.data.error);
        else toast.error("Something went wrong!");
      });
  };

  const handleRemoveImage = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/removepic`, {
        id: props.userDetails._id,
      })
      .then((res) => {
        toast.success(res.data.message);
        props.setProfilePicture(
          `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`
        );
      })
      .catch((err) => {
        if (err.response) toast.error(err.response.data.error);
        else toast.error("Something went wrong!");
      });
  };
  return (
    <div>
      {!showCropper ? (
        <ProfileAvatarSegment
          profileContent={props.profileContent}
          handleCropper={handleCropper}
          handleRemoveImage={handleRemoveImage}
          profilePicture={props.profilePicture}
          setProfilePicture={props.setProfilePicture}
        />
      ) : (
        <CropperSegment
          profileContent={props.profileContent}
          handleCropper={handleCropper}
          profilePicture={props.profilePicture}
          setProfilePicture={props.setProfilePicture}
        />
      )}
    </div>
  );
};

export default ProfilePictureBlock;
