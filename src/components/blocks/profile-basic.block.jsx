import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CropperSegment from "../segments/cropper.segment";
import ProfileAvatarSegment from "../segments/profile-avatar.segment";

const ProfileBasicBlock = (props) => {
  const [showCropper, setShowCropper] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: isAuth().name,
    email: isAuth().email,
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
        id: isAuth()._id,
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
        id: isAuth()._id,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/user/updateprofile`,

          {
            id: isAuth()._id,
            dateOfBirth: formData.dateOfBirth,
            contactNumber: formData.contactNumber,
            fullAddress: formData.fullAddress,
            gender: formData.gender,
            qualification: formData.qualification,
          }
        )
        .then((res) => {
          setFormData({
            ...formData,
            dateOfBirth: new Date(res.data.userProfile.dateOfBirth),
            contactNumber: res.data.userProfile.contactNumber,
            fullAddress: res.data.userProfile.fullAddress,
            gender: res.data.userProfile.gender,
            qualification: res.data.userProfile.qualification,
          });
          props.setProfilePicture(
            res.data.user.imagePath
              ? `${process.env.REACT_APP_SERVER_URL}/${res.data.user.imagePath}`
              : ""
          );
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    } else toast.warning("Enter All Details");
    setEditMode(false);
  };
  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const setDateOfBirth = (selectedDate) => {
    setFormData({ ...formData, dateOfBirth: selectedDate });
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputUserName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputUserName"
            aria-describedby="helpId"
            placeholder="Name"
            onChange={handleChange("name")}
            value={formData.name}
            readOnly
          />
          {editMode && (
            <small id="helpId" className="form-text text-muted">
              Can not change
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputUserEmail">EMAIL</label>
          <input
            type="text"
            className="form-control"
            id="inputUserEmail"
            aria-describedby="helpId"
            placeholder="EMAIL"
            onChange={handleChange("email")}
            value={formData.email}
            readOnly
          />
          {editMode && (
            <small id="helpId" className="form-text text-muted">
              Can not change
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="inputGender">Gender</label>
          <select
            className="form-control"
            id="inputGender"
            onChange={handleChange("gender")}
            value={formData.gender}
            readOnly={!editMode}
            disabled={!editMode}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputDateOfBirth">Date of birth</label>
          <DatePicker
            // dateFormat="dd/MM//yyyy"
            selected={formData.dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            placeholderText="Select Date of birth"
            readOnly={!editMode}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputContactNumber">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="inputContactNumber"
            aria-describedby="helpId"
            placeholder="Contact Number"
            onChange={handleChange("contactNumber")}
            value={formData.contactNumber}
            readOnly={!editMode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <textarea
            className="form-control"
            id="inputAddress"
            placeholder="Address"
            rows="3"
            value={formData.fullAddress}
            onChange={handleChange("fullAddress")}
            readOnly={!editMode}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="inputQualification">Qualification</label>
          <textarea
            className="form-control"
            id="inputQualification"
            placeholder="Qualification"
            rows="2"
            value={formData.qualification}
            onChange={handleChange("qualification")}
            readOnly={!editMode}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => {
            if (editMode) LoadDetails();
            setEditMode((prev) => !prev);
          }}
          className="btn btn-info button-edit-profile"
        >
          {editMode ? "CANCEL" : "EDIT"}
        </button>
        <button type="submit" className="btn btn-primary button-save-profile">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ProfileBasicBlock;
