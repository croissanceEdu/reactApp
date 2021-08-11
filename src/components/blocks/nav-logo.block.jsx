import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";
import Api from "../../helpers/content-api";

const NavLogoBlock = (props) => {
  const history = useHistory();
  const onClickEvent = (urlObject) => {
    if (urlObject.newTab) {
      var win = window.open(
        Api.getNavLinkPath(urlObject.urlPathName),
        "_blank"
      );
      win.focus();
    } else {
      if (urlObject.external) {
        window.location = Api.getNavLinkPath(urlObject.urlPathName);
      } else {
        history.push(Api.getNavLinkPath(urlObject.urlPathName));
      }
    }
  };
  return (
    <div className="navbar-brand">
      <a
        onClick={() => {
          onClickEvent(props.navLogoContent.logoUrl);
        }}
        className="navbar-logo"
      >
        <img src={logo} alt="CROISSANCE TECHNOLOGIES" />
      </a>
      <a
        className="navbar-caption"
        onClick={() => {
          onClickEvent(props.navLogoContent.titleUrl);
        }}
      >
        {props.navLogoContent.logoContent}
      </a>
    </div>
  );
};

export default NavLogoBlock;
