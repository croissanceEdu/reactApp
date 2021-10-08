import React, { useState } from "react";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../../helpers/auth";
import axios from "axios";
import Api from "../../helpers/content-api";
import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";
// import { useHistory } from "react-router-dom";

const LoginSection = (props) => {
  let urlPathContent = Api.getUrlPathContent();
  // let history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const { email, password } = formData;

  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          if (res.data) {
            authenticate(res, () => {
              setFormData({
                ...formData,
                email: "",
                password: "",
              });
              // console.log(res.data);
            });
            //authorise
            // if (props.userDetails) history.push(urlPathContent.homePage);
            // else history.push(urlPathContent.homePage);
            if (isAuth()) {
              toast.success(
                props.loginContent.alertMessages.loginSuccessMessageContent.replace(
                  "@name@",
                  res.data.user.name
                )
              );
              // props.setUserDetails(isAuth());
              window.location = urlPathContent.homePage;
              // history.push(urlPathContent.homePage);
            } else
              toast.error(
                props.loginContent.alertMessages.loginFailedMessageContent
              );
            // console.log(res.data.user);
          } else {
            toast.error(
              props.loginContent.alertMessages
                .serverDataNotavailableMessageContent
            );
          }
        })
        .catch((err) => {
          if (err.response) toast.error(err.response.data.error + "hi");
          else
            toast.error(
              props.loginContent.alertMessages.serverNotRespondMessageContent
            );
        });
    } else {
      toast.error(props.loginContent.alertMessages.fillAllFieldContent);
    }
  };

  return (
    <section className="login-section">
      <form className="form-signin text-center   " onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            {props.loginContent.titleContent}
          </h1>
          <p>
            {props.loginContent.instructionContent}
            <br />
            <a href={urlPathContent.registerPage}>
              {" "}
              {props.loginContent.clickHereContent}
            </a>
          </p>
        </div>

        <div className="form-label-group container m-2">
          {/* <label htmlFor="inputEmail">Email address</label>{" "} */}
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder={props.loginContent.emailContent}
            required
            autoFocus
            onChange={handleChange("email")}
            value={formData.email}
          />
        </div>
        <div className="form-label-group container m-2">
          {/* <label htmlFor="inputPassword">Password</label> */}
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder={props.loginContent.passwordContent}
            required
            onChange={handleChange("password")}
            value={formData.password}
          />
        </div>
        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}
        <button
          className="btn btn-lg btn-primary btn-block container"
          type="submit"
        >
          {props.loginContent.loginContent}
        </button>
        <p className="mt-5 mb-3 text-muted text-center">
          &copy; {props.loginContent.footerContent}
        </p>
      </form>
    </section>
  );
};

export default LoginSection;
