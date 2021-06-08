import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";
import Api from "../../helpers/content-api";
const NavLogoBlock = (props) => {
  return (
    <div className="navbar-brand">
      <a
        href={Api.getNavLinkPath(props.navLogoontent.logoUrl)}
        className="navbar-logo"
      >
        <img src={logo} alt="CROISSANCE TECHNOLOGIES" />
      </a>
      <a
        className="navbar-caption"
        href={Api.getNavLinkPath(props.navLogoontent.titleUrl)}
      >
        {props.navLogoontent.logoContent}
      </a>
    </div>
  );
};

export default NavLogoBlock;
