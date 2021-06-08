import React, { useState } from "react";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../../helpers/auth";
import axios from "axios";
import Api from "../../helpers/content-api";
import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";

const LoginSection = (props) => {
  let urlPathContent = Api.getUrlPathContent();

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
              toast.success(`Welcome ${res.data.user.name}`);
              console.log(props);
              // props.setUserDetails(isAuth());
              window.location = urlPathContent.homePage;
            } else toast.error("Couldn't login!");
            // console.log(res.data.user);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          if (err.response) toast.error(err.response.data.error);
          else toast.error("Something went wrong");
        });
    } else {
      toast.error("please fill all fields");
    }
  };

  return (
    <section className="login-section">
      <form className="form-signin text-center   " onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal"> Please Signin</h1>
          <p>
            Signin with your registered email address
            <br />
            <a href={urlPathContent.registerPage}>or click here to register.</a>
          </p>
        </div>

        <div className="form-label-group container m-2">
          {/* <label htmlFor="inputEmail">Email address</label>{" "} */}
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
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
            placeholder="Password"
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
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted text-center">
          &copy; Croissance Edu
        </p>
      </form>
    </section>
  );
};

export default LoginSection;
