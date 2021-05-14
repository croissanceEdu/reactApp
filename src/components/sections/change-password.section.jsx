import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";

const ChangePasswordSection = () => {
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
    console.log(formData);
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmPassword
    ) {
      if (formData.newPassword === formData.confirmPassword) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/changepassword`, {
            _id: isAuth()._id,
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
        toast.error("Password doesn't match");
      }
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <section>
      <div>Change Password </div>
      <form className="form-signin text-center col-6  " onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            id="currentPassword"
            className="form-control "
            placeholder="Current Password"
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
            placeholder="New Password"
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
            placeholder="Confirm Password"
            required
            onChange={handleChange("confirmPassword")}
            value={formData.confirmPassword}
          />
        </div>
        <button className="btn btn-lg btn-primary btn-block " type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordSection;