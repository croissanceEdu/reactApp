import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileBasicBlock = (props) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/user/updateprofile`,

          {
            id: props.userDetails._id,
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
    <div className="bacic-profile-block">
      <div className="edit-cancel-block">
        <button
          onClick={() => {
            if (editMode) LoadDetails();
            setEditMode((prev) => !prev);
          }}
          className={`btn button-edit-profile ${
            editMode ? "cancel-button" : "edit-button"
          }`}
        >
          {editMode ? "CANCEL" : "EDIT"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group container">
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
        <div className="form-group container">
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

        <div className="form-group container">
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

        <div className="form-group container">
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
        <div className="form-group container">
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
        <div className="form-group container">
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
        <div className="form-group container">
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
          disabled={!editMode}
          type="submit"
          className="btn save-button button-save-profile"
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ProfileBasicBlock;
