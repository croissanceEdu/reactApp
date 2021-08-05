import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Api from "../../helpers/content-api";
import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";

const RegistrationSection = (props) => {
  let urlPathContent = Api.getUrlPathContent();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imagePath: "",
    role: props.userRole,
  });

  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      if (formData.password === formData.confirmPassword) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            imagePath: formData.imagePath,
            role: formData.role,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              imagePath: "",
              role: props.userRole,
            });
            toast.success(res.data.message);
          })
          .catch((err) => {
            if (err.response) toast.error(err.response.data.error);
            else console.log(err);
          });
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <section className="register-section">
      <form className="form-register text-center  " onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            {props.registerContent.titleContent}
          </h1>
          <p>
            {props.registerContent.instructionContent}
            <br />
            <a href={urlPathContent.loginPage}>
              {props.registerContent.clickHereContent}
            </a>
          </p>
        </div>
        <div className="form-label-group m-2">
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder={props.registerContent.nameContent}
            required
            onChange={handleChange("name")}
            value={formData.name}
          />

          {/* <label htmlFor="inputName">{props.registerContent.nameContent}</label> */}
        </div>
        <div className="form-label-group m-2">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder={props.registerContent.emailContent}
            required
            onChange={handleChange("email")}
            value={formData.email}
          />

          {/* <label htmlFor="inputEmail">
            {props.registerContent.emailContent}
          </label> */}
        </div>
        <div className="form-label-group m-2">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder={props.registerContent.passwordContent}
            required
            onChange={handleChange("password")}
            value={formData.password}
          />
          {/* <label htmlFor="inputPassword">
            {props.registerContent.passwordContent}
          </label> */}
        </div>
        <div className="form-label-group m-2">
          <input
            type="password"
            id="inputConfirmPassword"
            className="form-control"
            placeholder={props.registerContent.confirmPasswordContent}
            required
            onChange={handleChange("confirmPassword")}
            value={formData.confirmPassword}
          />
          {/* <label htmlFor="inputConfirmPassword">
            {props.registerContent.confirmPasswordContent}
          </label> */}
        </div>

        <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
          {props.userRole === "teacher"
            ? props.registerContent.registerAsTeacherContent
            : props.registerContent.registerAsStudentContent}
        </button>
        <blockquote className="">
          {props.registerContent.commonWarningContent}
        </blockquote>
        <p className="mt-5 mb-3 text-muted text-center">
          &copy; Croissance Edu
        </p>
      </form>
    </section>
  );
};

export default RegistrationSection;
