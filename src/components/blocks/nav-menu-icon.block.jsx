import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";

const NavMenuIconBlock = (props) => {
  const handleClick = () => {
    props.setNavVisible(!props.navStyles.isNavMenuOpen);
  };
  return (
    <div className="nav-menu-table-cell">
      <button className="nav-toggler-icon" onClick={handleClick}>
        {!props.navStyles.isNavMenuOpen ? (
          <MenuIcon style={{ color: "#fff" }} />
        ) : (
          <CloseIcon style={{ color: "#fff" }} />
        )}
      </button>
    </div>
  );
};

export default NavMenuIconBlock;
