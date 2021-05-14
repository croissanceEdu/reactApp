import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";
const NavLogoBlock = () => {
  return (
    <div className="navbar-brand">
      <a href="http://croissance.uk" className="navbar-logo">
        <img src={logo} alt="CROISSANCE TECHNOLOGIES" />
      </a>
      <a
        className="navbar-caption"
        href="http://croissance.uk/Croissanceedu.html"
      >
        CROISSANCE EDU
      </a>
    </div>
  );
};

export default NavLogoBlock;
