import { signout } from "../../helpers/auth";
import Api from "../../helpers/content-api";
import { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const NavUserBlock = (props) => {
  const [panelClassName, setPanelClassName] = useState("hidden-menu");

  const handleToggle = () => {
    setPanelClassName((prevClass) =>
      prevClass === "hidden-menu" ? "shown-menu" : "hidden-menu"
    );
  };
  const handleClose = () => {
    setPanelClassName("hidden-menu");
  };
  document.onscroll = handleClose;

  //Logout
  const handleLogout = () => {
    handleClose();
    signout(() => {
      if (props.userDetails) {
        window.location = "/";
      } else {
        window.location = "/login";
      }
    });
  };

  //ChangePassword
  const handleChangePassword = () => {
    handleClose();
    window.location = Api.getNavLinkPath("changePasswordPage");
  };
  //Profile
  const handleProfile = () => {
    handleClose();
    window.location = Api.getNavLinkPath("profilePage");
  };
  return (
    <div className={`nav-user-block ${panelClassName}`}>
      <div className="nav-user-div" onClick={handleToggle}>
        <div className="nav-avatar-name">
          <div className="user-avatar">
            <div
              className="avatar-img"
              style={{
                backgroundImage: "url(" + props.profilePicture + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <h4>
            {props.userDetails ? props.userDetails.name : null}{" "}
            <ArrowDropDownIcon style={{ color: "#fff" }} />
          </h4>{" "}
        </div>{" "}
        <p>{props.userDetails ? props.userDetails.email : null} </p>
      </div>

      <ul className={panelClassName}>
        <li>
          <button onClick={handleProfile}>
            {props.navUserContent.profileContent}
          </button>
        </li>
        <li>
          <button onClick={handleChangePassword}>
            {props.navUserContent.changePasswordContent}
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            {props.navUserContent.logoutContent}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavUserBlock;
