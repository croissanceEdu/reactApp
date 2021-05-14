import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import { useState } from "react";

const NavMenuIconBlock = () => {
  const [menu, setMenu] = useState(false);
  const handleClick = () => {
    setMenu((prev) => !prev);
  };
  return (
    <div onClick={handleClick}>{!menu ? <MenuIcon /> : <CloseIcon />}</div>
  );
};

export default NavMenuIconBlock;
