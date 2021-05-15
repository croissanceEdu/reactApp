import { useEffect } from "react";
import { isAuth } from "../../helpers/auth";
import NavLinksBlock from "../blocks/nav-links.block";
import NavLogoBlock from "../blocks/nav-logo.block";
import NavMenuIconBlock from "../blocks/nav-menu-icon.block";
import NavUserBlock from "../blocks/nav-user.block";

const NavbarSection = (props) => {
  useEffect(() => {
    if (isAuth().imagePath && !props.profilePicture)
      props.setProfilePicture(
        `${process.env.REACT_APP_SERVER_URL}/${isAuth().imagePath}`
      );
  }, [props]);
  if (isAuth()) {
    return (
      <section className="navbar">
        <div className="container-element">
          <NavLogoBlock />
          <NavLinksBlock selectedPage={props.selectedPage} />
          <NavUserBlock profilePicture={props.profilePicture} />
          <NavMenuIconBlock />
        </div>
      </section>
    );
  } else return null;
};

export default NavbarSection;
