import { isAuth } from "../../helpers/auth";
import { getNavBarContent } from "../../helpers/content-api";
import NavLinksBlock from "../blocks/nav-links.block";
import NavLogoBlock from "../blocks/nav-logo.block";
import NavMenuIconBlock from "../blocks/nav-menu-icon.block";
import NavUserBlock from "../blocks/nav-user.block";

const NavbarSection = (props) => {
  const navBarContent = getNavBarContent(props.language);

  if (isAuth()) {
    return (
      <>
        <div
          className={
            props.navStyles.navbarSectionClassNames +
            props.navStyles.navbarSectionScrollEffectClassNames
          }
        >
          <div className="container-element">
            <NavLogoBlock />
            <NavMenuIconBlock
              setoverlayClassNames={props.setoverlayClassNames}
              setNavVisible={props.setNavVisible}
              navStyles={props.navStyles}
            />
            <nav className={props.navStyles.navClassNames}>
              <NavLinksBlock
                selectedPage={props.selectedPage}
                navLinkContent={navBarContent.navLinks}
                setNavVisible={props.setNavVisible}
                setProfilePicture={props.setProfilePicture}
                notifications={props.notifications}
              />
              <NavUserBlock
                profilePicture={props.profilePicture}
                navUserContent={navBarContent.navUser}
                setNavVisible={props.setNavVisible}
              />
            </nav>
          </div>
        </div>
        <div className="navbar-spacer"></div>
      </>
    );
  } else return null;
};

export default NavbarSection;
