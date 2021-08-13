import { signout } from "../../helpers/auth";
import Api from "../../helpers/content-api";
import { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import { useHistory } from "react-router-dom";
import NavLinkItem from "../items/nav-link.item";
// import { v4 as uuidv4 } from "uuid";

const NavUserBlock = (props) => {
  const [panelClassName, setPanelClassName] = useState("hidden-menu");
  // const history = useHistory();
  const handleToggle = () => {
    setPanelClassName((prevClass) =>
      prevClass === "hidden-menu" ? "shown-menu" : "hidden-menu"
    );
  };
  const handleClose = () => {
    setPanelClassName("hidden-menu");
  };
  const handleCloseNav = () => {
    handleClose();
    props.setNavVisible(false);
  };
  document.onscroll = handleClose;

  //Logout
  const handleLogout = () => {
    handleCloseNav();
    signout(() => {
      if (props.userDetails && false) {
        window.location = "/";
      } else {
        window.location = "/login";
      }
    });
  };

  // //ChangePassword
  // const handleChangePassword = () => {
  //   handleClose();
  //   history.push(Api.getNavLinkPath("changePasswordPage"));
  // };
  // //Profile
  // const handleProfile = () => {
  //   handleClose();
  //   history.push(Api.getNavLinkPath("profilePage"));
  // };
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
        <NavLinkItem
          content={props.navUserContent.profileContent}
          navLinkPath={Api.getNavLinkPath("profilePage")}
          notificationCount={0}
          // key={uuidv4()}
          itemClassName=""
          onClickCallBack={handleCloseNav}
        />
        <NavLinkItem
          content={props.navUserContent.changePasswordContent}
          navLinkPath={Api.getNavLinkPath("changePasswordPage")}
          notificationCount={0}
          // key={uuidv4()}
          itemClassName=""
          onClickCallBack={handleCloseNav}
        />
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
