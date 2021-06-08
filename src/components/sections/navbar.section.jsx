import { getNavBarContent } from "../../helpers/content-api";
import NavLinksBlock from "../blocks/nav-links.block";
import NavLogoBlock from "../blocks/nav-logo.block";
import NavMenuIconBlock from "../blocks/nav-menu-icon.block";
import NavUserBlock from "../blocks/nav-user.block";

const NavbarSection = (props) => {
  const navBarContent = getNavBarContent(props.language);

  if (props.userDetails) {
    return (
      <div
        className={
          props.navStyles.navbarSectionClassNames +
          props.navStyles.navbarSectionScrollEffectClassNames
        }
      >
        <div className="container-element">
          <NavLogoBlock navLogoontent={navBarContent.navLogo} />
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
              userDetails={props.userDetails}
            />
          </nav>
        </div>
      </div>
    );
  } else return null;
};

export default NavbarSection;
