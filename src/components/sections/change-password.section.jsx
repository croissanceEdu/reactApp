import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";

const ChangePasswordSection = (props) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  //   const { email, password } = formData;

  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmPassword
    ) {
      if (formData.newPassword === formData.confirmPassword) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/changepassword`, {
            _id: props.userDetails._id,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          })
          .then((res) => {
            toast.success(res.data.message);
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error(
          props.changePasswordContent.alertMessages.passwordNotMatchContent
        );
      }
    } else {
      toast.error(
        props.changePasswordContent.alertMessages.fillAllFieldContent
      );
    }
  };
  return (
    <section className="change-password-section container">
      <div className="navbar-spacer"></div>
      <h2>{props.changePasswordContent.titleContent}</h2>
      <form
        className="form-signin text-center container "
        onSubmit={handleSubmit}
      >
        <div className="form-group top-form-group">
          <input
            type="password"
            id="currentPassword"
            className="form-control "
            placeholder={props.changePasswordContent.currentPasswordContent}
            required
            onChange={handleChange("currentPassword")}
            value={formData.currentPassword}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="newPassword"
            className="form-control "
            placeholder={props.changePasswordContent.newPasswordContent}
            required
            onChange={handleChange("newPassword")}
            value={formData.newPassword}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            className="form-control "
            placeholder={props.changePasswordContent.confirmPasswordContent}
            required
            onChange={handleChange("confirmPassword")}
            value={formData.confirmPassword}
          />
        </div>
        <button
          className="btn btn-lg save-button bottom-form-group"
          type="submit"
        >
          {props.changePasswordContent.submitContent}
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordSection;
