import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileBasicBlock = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: props.userDetails.name,
    email: props.userDetails.email,
    dateOfBirth: new Date(),
    contactNumber: "",
    fullAddress: "",
    gender: props.profileContent.genderOptions[0].value,
    qualification: "",
  });
  useEffect(() => {
    LoadDetails();
    setEditMode(false);
  }, []);

  const LoadDetails = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getdetails`, {
        id: props.userDetails._id,
      })
      .then((res) => {
        if (res.data.userProfile)
          setFormData({
            ...formData,
            dateOfBirth: new Date(res.data.userProfile.dateOfBirth),
            contactNumber: res.data.userProfile.contactNumber,
            fullAddress: res.data.userProfile.fullAddress,
            gender: res.data.userProfile.gender,
            qualification: res.data.userProfile.qualification,
          });
        else
          toast.error(
            props.profileContent.alertMessages
              .serverDataNotavailableMessageContent
          );
      })
      .catch((err) => {
        if (err.response) toast.error(err.response.data.error);
        else
          toast.error(
            props.profileContent.alertMessages.serverNotRespondMessageContent
          );
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
          toast.error(
            props.profileContent.alertMessages.serverNotRespondMessageContent
          );
        });
    } else
      toast.warning(props.profileContent.alertMessages.fillAllFieldContent);
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
          {editMode
            ? props.profileContent.cancelContent
            : props.profileContent.editContent}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group container">
          <label htmlFor="inputUserName">
            {props.profileContent.nameContent}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUserName"
            aria-describedby="helpId"
            placeholder={props.profileContent.nameContent}
            onChange={handleChange("name")}
            value={formData.name}
            readOnly
          />
          {editMode && (
            <small id="helpId" className="form-text text-muted">
              {props.profileContent.canNotChangeContent}
            </small>
          )}
        </div>
        <div className="form-group container">
          <label htmlFor="inputUserEmail">
            {props.profileContent.emailContent}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUserEmail"
            aria-describedby="helpId"
            placeholder={props.profileContent.emailContent}
            onChange={handleChange("email")}
            value={formData.email}
            readOnly
          />
          {editMode && (
            <small id="helpId" className="form-text text-muted">
              {props.profileContent.canNotChangeContent}
            </small>
          )}
        </div>

        <div className="form-group container">
          <label htmlFor="inputGender">
            {props.profileContent.genderContent}
          </label>
          <select
            className="form-control"
            id="inputGender"
            onChange={handleChange("gender")}
            value={formData.gender}
            readOnly={!editMode}
            disabled={!editMode}
          >
            {props.profileContent.genderOptions.map((item) => (
              <option value={item.value}>{item.content}</option>
            ))}
          </select>
        </div>

        <div className="form-group container">
          <label htmlFor="inputDateOfBirth">
            {props.profileContent.dobContent}
          </label>
          <DatePicker
            // dateFormat="dd/MM//yyyy"
            selected={formData.dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            placeholderText={props.profileContent.selectDobContent}
            readOnly={!editMode}
            className="form-control"
          />
        </div>
        <div className="form-group container">
          <label htmlFor="inputContactNumber">
            {props.profileContent.contactContent}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputContactNumber"
            aria-describedby="helpId"
            placeholder={props.profileContent.contactContent}
            onChange={handleChange("contactNumber")}
            value={formData.contactNumber}
            readOnly={!editMode}
          />
        </div>
        <div className="form-group container">
          <label htmlFor="inputAddress">
            {props.profileContent.fullAddressContent}
          </label>
          <textarea
            className="form-control"
            id="inputAddress"
            placeholder={props.profileContent.fullAddressContent}
            rows="3"
            value={formData.fullAddress}
            onChange={handleChange("fullAddress")}
            readOnly={!editMode}
          ></textarea>
        </div>
        <div className="form-group container">
          <label htmlFor="inputQualification">
            {props.profileContent.qualificationContent}
          </label>
          <textarea
            className="form-control"
            id="inputQualification"
            placeholder={props.profileContent.qualificationContent}
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
          {props.profileContent.saveContent}
        </button>
      </form>
    </div>
  );
};

export default ProfileBasicBlock;
